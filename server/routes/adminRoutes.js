const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db/index.js");
const auth = require("../utilities/auth.js");
const router = express.Router();
const path = require("path");
if(process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: path.join(__dirname, "..", ".env") });
}

router.post("/login", async (req, res) => {
    try {
        const { adminAccessKey } = req.body;
        if(adminAccessKey === process.env.ADMIN_ACCESS_KEY) {
            const token = jwt.sign({
                adminAccessKey: adminAccessKey
            }, process.env.ADMIN_ACCESS_KEY);
            return res.json({
                status: "success",
                info: "Login Successful, Welcome",
                title: "Success",
                data: token
            });
        } else {
            return res.json({
                status: "error",
                info: "Invalid Access Key",
                title: "Error"
            });
        }
    } catch(err) {
        console.log(err);
        res.json({ 
            info :"An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.get("/inventory", auth.requireAdminAuthentication, async (req, res) => {
    try {
        const { availablity } = req.query;
        const result = await db.getCarData(availablity);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({ 
            info :"An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.delete("/:numberPlate/sell", auth.requireAdminAuthentication, async (req, res) => {
    try {
        const { numberPlate } = req.params;
        const result = await db.deleteInventoryItem(numberPlate);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({ 
            info :"An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.patch("/:numberPlate/repair", auth.requireAdminAuthentication, async (req, res) => {
    try {
        const { numberPlate } = req.params;
        const result = await db.repairCar(numberPlate);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({ 
            info :"An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.patch("/:numberPlate/retrieve", auth.requireAdminAuthentication, async (req, res) => {
    try {
        const { numberPlate } = req.params;
        const result = await db.retrieveCar(numberPlate);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({ 
            info :"An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.get("/rents", auth.requireAdminAuthentication, async (req, res) => {
    try {
        const result = await db.getRentData();
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({ 
            info :"An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.patch("/return", auth.requireAdminAuthentication, async (req, res) => {
    try {
        let { rentId, mileMeterEnd, gasConsumed, refundAmount } = req.body;
        mileMeterEnd = parseInt(mileMeterEnd);
        gasConsumed = parseInt(gasConsumed);
        refundAmount = parseInt(refundAmount);
        const result = await db.returnCar(rentId, mileMeterEnd, gasConsumed, refundAmount);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({ 
            info :"An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.post("/cars", auth.requireAdminAuthentication, async (req, res) => {
    try {
        const { carname, price, baseamount, rupeeperkm, rupeeperhour, imagelink } = req.body;
        const result = await db.insertCarModel(carname, price, baseamount, rupeeperkm, rupeeperhour, imagelink);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({ 
            info :"An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.get("/cars", auth.requireAdminAuthentication, async (req, res) => {
    try {
        const result = await db.getCarModels();
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({ 
            info :"An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.delete("/cars", auth.requireAdminAuthentication, async (req, res) => {
    try {
        const { carId } = req.body;
        const result = await db.deleteCarItem(carId);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({ 
            info :"An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

module.exports = router;