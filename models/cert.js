const mongoose = require("mongoose");

const certSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'ABCD', 
    },
    bmi: {
      type: Number,
      default: 10,
    },
    calorietarget: {
      type: Number,
      default: 10,
    },
    caloriecurrent: {
      type: Number,
      default: 10,
    },
    fattarget: {
      type: Number,
      default: 10,
    },
    fatcurrent: {
      type: Number,
      default: 10,
    },
    proteintarget: {
      type: Number,
      default: 10,
    },
    proteincurrent: {
      type: Number,
      default: 10,
    },
    carbotarget: {
      type: Number,
      default: 10,
    },
    carbocurrent: {
      type: Number,
      default: 10,
    },
    gender: {
      type: String,
      default: "male",
    },
    age: {
      type: Number,
      default: 10,
    },
    height: {
      type: Number,
      default: 10,
    },
    weight: {
      type: Number,
      default: 10,
    },
    wtype: {
      type: String,
      default: "sample",
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const cert = mongoose.model("cert", certSchema);

module.exports = cert;