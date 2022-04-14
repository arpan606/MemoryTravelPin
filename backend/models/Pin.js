const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required:true
    },
    title: {
      type: String,
        required:true
    },
    desc: {
      type: String,
        required:true
    },
    rating: {
      type: Number,
        required:true
    },
    longt: {
      type: Number,
        required:true

    },
    lat: {
      type: Number,
        required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
