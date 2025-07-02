const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema(
  {
    CountryName: {
      type: String,
      required: true,
    },
    TotalUser: {
      type: Number,
      required: true,
    },
    TotalScore: {
      type: Number,
      required: true,
    },
    Healthcare: {
      type: Number,
      required: true,
    },
    Education: {
      type: Number,
      required: true,
    },
    Employment: {
      type: Number,
      required: true,
    },
    Transportation: {
      type: Number,
      required: true,
    },
    PublicSafety: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Countries", countrySchema);
