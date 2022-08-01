const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'You must provide a name']
    },
    contactNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
        },
        msg: "Phone number is invalid!",
      },
      required: [true, 'You must provide a phone number'],
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("BuyerInfo", schema);
