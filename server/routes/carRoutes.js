const express = require("express");
const db = require("../db/index.js");
const auth = require("../utilities/auth.js");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { carName, type, price } = req.query;
        let lowerBound, upperBound;
        if(price == "2000") {
            lowerBound = 0;
            upperBound = 2000;
        } else if(price === "4000") {
            lowerBound = 2000;
            upperBound = 4000;
        } else if(price === "6000") {
            lowerBound = 4000;
            upperBound = 6000;
        } else {
            lowerBound = 0;
            upperBound = 1000000;
        }
        const result = await db.getCars(carName, type, lowerBound, upperBound);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({
            info: "An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.post("/rent", auth.requireAuthentication, async (req, res) => {
    try {
        const { carId, carType, expectedReturn } = req.body;
        const modifiedExpectedReturn = expectedReturn.substr(8, 2) + "/" + expectedReturn.substr(5, 2) + "/" + expectedReturn.substr(0, 4);
        const result = await db.rentCar(carId, modifiedExpectedReturn, res.locals.userid, carType);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({
            info: "An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.get("/models", auth.requireAdminAuthentication, async (req, res) => {
    try {
        const result = await db.getCarModels();
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({
            info: "An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.post("/", auth.requireAdminAuthentication, async (req, res) => {
    try {
        const { carId, carType, numberPlate, mileMeterReading } = req.body;
        const result = await db.insertInventory(carId, carType, numberPlate, mileMeterReading);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({
            info: "An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.patch("/return", auth.requireAuthentication, async (req, res) => {
    try {
        const { rentId } = req.query;
        const result = await db.requestedToReturn(rentId);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({
            info: "An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

module.exports = router;