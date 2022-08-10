const express = require("express");
const router = express.Router();
const jwtAuth = require("../lib/jwtAuth");
const buyerController = require("../controllers/buyerController")

router
    .route('/readAllSellerDetails')
    .get( jwtAuth, buyerController.readAllSellerDetails)

module.exports = router;