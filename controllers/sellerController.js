const express = require("express");
const mongoose = require("mongoose");
const jwtAuth = require("../lib/jwtAuth");

const User = require("../db/User");
const Buyer = require("../db/Buyer");
const Seller = require("../db/Seller");
const SellerDetails = require("../db/SellerDetails")
const { JsonWebTokenError } = require("jsonwebtoken");

const router = express.Router();

// to create all details from Sellers
exports.saveSellerDetails = async (req, res) => {
    try {
        const saveDetail = await SellerDetails.create(req.body)
        // let saveDetail = new SellerDetails({
        //         name: req.body.name,
        //         contactNumber: req.body.name,
        //         location: req.body.name,
        //         aomuntOfMasses: req.body.name,
        //         weight: req.body.name,
        //         typeOfRice: req.body.name,
        //         pricePerMasss: req.body.name
        // })
        // if(req.file){
        //     saveDetail.picture = req.file.path
        // }
        // saveDetail.save()
        res.json(saveDetail);
    } catch (err) {
        res.json({ message: err })
    }
}

// Get saved detils
exports.getSavedDetails = async(req,res)=>{
    // console.log(req.params,req.body)
    try{
       const abc = await SellerDetails.findById(req.params.Rid)
       res.json(abc)
    }catch(err){
       res.json({message:err})
    }
 }

// DELETING
exports.deletingSavedDetails = async (req, res) => {
    try {
        const removeDetails = await SellerDetails.remove({ _id: req.params.Did })
        res.json(removeDetails)
    } catch (err) {
        res.json({ message: err })
    }
}

// UPDATING
exports.UpdatingSavedDetails = async (req, res) => {
    try {
        const updatedDetails = await SellerDetails.findByIdAndUpdate(req.params.Uid, req.body, {
           new: true,
           runValidators: true
        })
        res.json(updatedDetails);
     }
    // try {
    //     const updatedDetails = await SellerDetails.findByIdAndUpdate(req.params.Uid, {
    //         name: req.body.name,
    //         contactNumber: req.body.contactNumber,
    //         location: req.body.location,
    //         weight: req.body.weight,
    //         aomuntOfMasses: req.body.aomuntOfMasses,
    //         typeOfRice: req.body.typeOfRice,
    //         pricePerMasss: req.body.pricePerMasss
    //     },
    //     {
    //         new: true,
    //         runValidators: true
    //     })
    //     res.json(updatedDetails);
    // }
    catch (err) {
        res.json({ message: err })
    }
}


// Can also be used;
// module.exports = {
    
//     saveSellerDetails,
//     getSavedDetails,
//     deletingSavedDetails,
//     UpdatingSavedDetails

// };