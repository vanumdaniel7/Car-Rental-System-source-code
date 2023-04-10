const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db/index.js");
const auth = require("../utilities/auth.js");
const mailer = require("../utilities/mailer.js");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const result = await auth.createUser(req.body);
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

router.get("/verify/:token", async (req, res) => {
    try {
        const { token } = req.params;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if(err) {
                if(err.name === "TokenExpiredError") {
                    return res.status(200).json({
                        status: "error",
                        title: "Expired link",
                        info: "Verification link expired, request another verfication link from the login page"
                    });
                } else if(err.name === "JsonWebTokenError") {
                    return res.status(200).json({
                        status: "error",
                        title: "Invalid verification link",
                        info: "The verification url is not valid, request another verfication link from the login page"
                    });
                }
            }
            const result = await auth.verifyUser(decoded.data.email);
            res.json(result);
        });
    } catch(err) {
        console.log(err);
        res.json({ 
            info: "An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await auth.authenticateUser(email, password);
        if(result.status === "success") {
            const token = jwt.sign({ 
                data: result.data,
                exp: Math.floor(Date.now() / 1000) + (60 * 60) 
            }, process.env.ACCESS_TOKEN_SECRET);
            result.token = token;
        }
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

router.get("/resetemail", async (req, res) => {
    try {
        const { email } = req.query;
        const { userid, name } = await db.getUserDetailsFromEmail(email);
        if(userid === null) {
            console.log(err);
            return res.json({
                info : "Account doesn't exist", 
                status: "error", 
                title: "Error"
            })
        }
        await mailer.sendPasswordResetEmail(userid, email, name);
        res.json({ 
            info: "Password reset email sent succesfully", 
            status: "success", 
            title: "Success" 
        }); 
    } catch(err) {
        console.log(err);
        res.json({ 
            info :"An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.patch("/:token/changepassword", async (req, res) => {
    try {
        const { token } = req.params;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if(err) {
                if(err.name === "TokenExpiredError") {
                    return res.status(200).json({
                        status: "error",
                        title: "Expired link",
                        info: "Verification link expired, request another verfication link from the login page"
                    });
                } else if(err.name === "JsonWebTokenError") {
                    return res.status(200).json({
                        status: "error",
                        title: "Invalid verification link",
                        info: "The verification url is not valid, request another verfication link from the login page"
                    });
                }
            }
            const { password } = req.query;
            const result = await db.changeUserPassword(decoded.data.userid, password);
            res.status(200).json(result);
        });
    } catch(err) {
        console.log(err);
        res.json({
            info: "An unexpected error occured, please try again later", 
            status: "error", 
            title: "Error" 
        });
    }
});

router.get("/profile", auth.requireAuthentication, async (req, res) => {
    try {
        const result = await db.getUserProfile(res.locals.userid);
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

router.get("/rent", auth.requireAuthentication, async (req, res) => {
    try {
        const result = await db.getUserRentedCars(res.locals.userid);
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

router.get("/return", auth.requireAuthentication, async(req, res) => {
    try {
        const result = await db.getUserReturnedCars(res.locals.userid);
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

router.patch("/", auth.requireAuthentication, async (req, res) => {
    try {
        const userid = res.locals.userid;
        const { name, password } = req.query;
        const actualName = name.trim();
        const actualPassword = password.trim();
        const result = await db.updateUserDetails(userid, actualName, actualPassword);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({
            err:"An unexpected error occured, please try again later", 
            info: "error", 
            title: "Error" 
        });
    }
});

router.patch("/recharge", auth.requireAuthentication, async (req, res) => {
    try {
        const { balance } = req.body;
        const result = await db.updateBalance(res.locals.userid, balance);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.json({
            err:"An unexpected error occured, please try again later", 
            info: "error", 
            title: "Error" 
        });
    }
});

module.exports = router;