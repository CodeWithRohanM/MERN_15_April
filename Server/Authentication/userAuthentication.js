const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const userData = require("../src/Models/userSchema");

const authenticateUser = async (req, res, next) => {
    try {

        // console.log("Inside Authe");

        const getRegistrationCookie = req.cookies.Registration_Cookie;
        const getLogInCookie = req.cookies.LogIn_Cookie;



        if (getRegistrationCookie) {
            if (getLogInCookie) {
                const authenticate = await jwt.verify(getLogInCookie, "bulldoglabradordhinkachikachika");

                if (authenticate) {
                    console.log(authenticate);
                }
                else {
                    console.log("Inside Auth Error");
                    res.render("ErrorPage");
                }

            } else {
                res.render("LogInPage");
            }

        } else {
            res.render("RegisterPage");
        }


        const currentAuthenticate = await jwt.verify(getLogInCookie, "bulldoglabradordhinkachikachika");

        req.logInCookie = getLogInCookie;
        req.getData = await userData.findOne({_id: currentAuthenticate.id});

        next();



    } catch (err) {
        console.log(err);
        res.render("ErrorPage");
    }

};

module.exports = authenticateUser;