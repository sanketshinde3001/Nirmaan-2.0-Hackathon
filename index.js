const express = require("express");
const pdf = require("html-pdf");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { checkForAuthentication , restrictTo } = require("./middlewares/auth");
const staticRoute = require("./routes/staticRouter");

const userRoute = require("./routes/user");

const PORT = 5000;

connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/nirmaan2").then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/user',userRoute)
// app.use("/BMI", restrictTo(["NORMAL","ADMIN"]));
app.use("/", staticRoute);


app.get("/", (req, res) => {
  res.render("home");
});
app.get("/error", (req, res) => {
  res.render("error");
});


const port = 5000;
app.listen(port, () => console.log("Server is runnig on : " + port));
