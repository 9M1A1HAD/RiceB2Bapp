const express = require("express");
const router = express.Router();
const jwtAuth = require("../lib/jwtAuth");
const sellerController = require('../controllers/sellerController')
const upload = require("../lib/upload")

// Creating the details of Sellers after the login.
router
    .route('/save/sellerDetails')
    .post(jwtAuth ,sellerController.saveSellerDetails);
    // .post(jwtAuth, upload.single('picture') ,sellerController.saveSellerDetails);

// Reading the perticuller details of Sellers after Creating the details of Sellers after the login.
router
    .route('/read/:Rid')
    .get(jwtAuth,sellerController.getSavedDetails);

// Updating the perticuller details
router
    .route('/update/:Uid')
    .patch(jwtAuth,sellerController.UpdatingSavedDetails);

// Deleting the perticuller details
router
    .route('/delete/:Did')
    .delete(jwtAuth,sellerController.deletingSavedDetails);

module.exports = router;