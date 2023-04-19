const express = require("express");
const app = express();
const router = express.Router();
const userData = require("../Models/userSchema");


router.post("/", async (req, res) => {
    try {

        const getFirstName = req.body.firstName;
        const getLastName = req.body.lastName;
        const getEmail = req.body.email;
        const getPassword = req.body.password;
        const getPhone = req.body.phone;

        const insertUserData = new userData({
            firstName: getFirstName,
            lastName: getLastName,
            email: getEmail,
            password: getPassword,
            phone: getPhone,
        });

        const getData = await insertUserData.save();
        res.send(getData);

    }
    catch (err) {
        console.log("Error Occured.. 👇👇");
        console.log(err);
        res.send(err);
    }


});


router.get("/", async (req, res) => {
    try {
        const getData = await userData.find();

        res.send(getData);

    } catch (err) {
        res.send(err);
    }

});

router.get("/:firstName", async (req, res) => {
    try {
        const getFirstName = req.params.firstName;

        const getData = await userData.findOne({ firstName: getFirstName });

        res.send(getData);

    } catch (err) {
        res.send(err);
    }

});


router.patch("/:firstName", async (req, res) => {
    try {
        const getFirstName = req.params.firstName;

        const getValidation = await userData.updateOne({ firstName: getFirstName }, { $set: { firstName: "shubhname" } });

        if (getValidation) {
            const getData = await userData.find();
            res.send(getData);
        }

    } catch (err) {
        res.send(err);
    }

});


router.delete("/:firstName", async (req, res) => {
    try {
        const getFirstName = req.params.firstName;

        const getValidation = await userData.deleteOne({ firstName: getFirstName });

        if (getValidation) {
            const getData = await userData.find();
            res.send(getData);
        }

    } catch (err) {
        res.send(err);
    }

});

module.exports = router;