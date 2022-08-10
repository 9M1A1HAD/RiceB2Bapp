const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
    },
    name: {
      type: String,
      required: [true, 'You must provide a name'],
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
    location: {
      type: String,
      required: [true, 'You must provide a location'],
    },
    weight: {
      type: String,
      required: [true, 'You must provide a wieght'],
    },
    aomuntOfMasses: {
      type: String,
      required: [true, 'You must provide an amount'],
    },
    typeOfRice: {
      type: String,
      required: [true, 'You must provide a type'],
    },
    pricePerMasss: {
      type: String,
      required: [true, 'You must provide an amount'],
    },
    // picture: {
    //   type: String,
    //   required: [true, 'You must provide an image'],
    // }
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("SellersInfo", schema);
