const express = require("express");
const cert = require("../models/cert");
const { restrictTo } = require("../middlewares/auth");
const { handleUserLogout  } = require("../controllers/user");

const router = express.Router();

router.get('/admin/seepdf' , restrictTo(["ADMIN"]),async (req, res) => {
  // console.log(req)
  // if (!req.user) return res.redirect("/login");
  const allpdfs = await cert.find({});
  return res.render("seepdf", {
    pdfs: allpdfs,
  });
});



router.get("/", async (req, res) => {
  return res.render("home");
});

router.get("/bmi", async (req, res) => {
  return res.render("find");
});
router.get("/calorie", async (req, res) => {
  return res.render("calorie");
});
router.get("/challenge", async (req, res) => {
  return res.render("dragndrop");
});

router.get("/quiz", async (req, res) => {
  return res.render("quiz");
});
router.get("/quiz2", async (req, res) => {
  return res.render("quiz2");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});


router.get("/logout", handleUserLogout);

// router.get("/user/seepdf", restrictTo(["NORMAL" , "ADMIN"]) ,async (req, res) => {
//   // console.log(req)
//   // if (!req.user) return res.redirect("/login");
//   const allpdfs = await cert.find({ createdBy: req.user._id });
//   return res.render("seepdf", {
//     pdfs: allpdfs,
//   });
// });

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post('/api/addBMI', async (req, res) => {
  try {
    const { bmi } = req.body;

    const userId = req.user._id;

    const existingCert = await cert.findOne({ userId });

    if (existingCert) {
      // If it exists, update the values
      existingCert.bmi = bmi;
      await existingCert.save();
    } else {
      // If it doesn't exist, create a new entity
    const certInstance = new cert({ bmi ,visitHistory: [], createdBy: req.user._id, });
      await certInstance.save();
    }


    // Send a success response
    res.json({ success: true, message: 'BMI added to the dataset successfully!' });
  } catch (error) {
    // Handle errors
    console.error('Error adding BMI to the dataset:', error);
    res.status(500).json({ success: false, message: 'Failed to add BMI to the dataset.' });
  }
});

router.post('/api/addCalorie', async (req, res) => {
  try {
      // Extract data from the request body
      const { age, gender, cen, weight, wtype } = req.body;
      const userId = req.user._id;

      // Check if a user with similar details exists
      const existingUser = await cert.findOne({ userId });

      if (existingUser) {
          // Update the existing user's details
          existingUser.age = age;
          existingUser.gender = gender;
          existingUser.height = cen;
          existingUser.weight = weight;
          existingUser.wtype = wtype;

          await existingUser.save();
      } else {
          // Create a new user
          const newUser = new UserModel({ age, gender, cen, weight, wtype });
          await newUser.save();
      }

      // Send a success response
      res.json({ success: true });
  } catch (error) {
      // Handle errors
    console.error('Error adding/updating data to the database:', error , 'Please try again after login');
      res.status(500).json({ success: false });
  }
});

module.exports = router;