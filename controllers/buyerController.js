const express = require("express");
const mongoose = require("mongoose");
const jwtAuth = require("../lib/jwtAuth");
const { JsonWebTokenError } = require("jsonwebtoken");
const verifyToken = require("../lib/verifyToken")

const User = require("../db/User");
const Buyer = require("../db/Buyer");
const Seller = require("../db/Seller");
const SellerDetails = require("../db/SellerDetails")

// Buyer can see all Sellers in list using this function mentioned below as "readAllSellerDetails()"
exports.readAllSellerDetails = async (req, res) => {
    try {
        const abc = await SellerDetails.find();
        res.json(abc)
    } catch (err) {
        res.json({ message: err })
    }
}

// Can also be Used.
// module.exports = {
//     readAllSellerDetails,
// };