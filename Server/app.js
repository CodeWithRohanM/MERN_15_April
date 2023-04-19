const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;
const hbs = require("hbs");
require('./src/DB/userConnection');
const userData = require("./src/Models/userSchema");
const userRouter = require("./src/Routers/userRouter");
const { dialog } = require("electron");
const bcrypt = require("bcryptjs");
const authenticateUser = require("./Authentication/userAuthentication");
const cookieParser = require("cookie-parser");
const cors = require("cors");

console.log(__dirname);
const getStaticPath = path.join(__dirname, "/piblic")
// app.use(express.static(getStaticPath));


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(userRouter);

app.set("view engine", "hbs");
app.set("views", "/Users/rohanmote/Desktop/Thapa Projects/MERN_15_April/Server/views");
hbs.registerPartials("/Users/rohanmote/Desktop/Thapa Projects/MERN_15_April/Server/Partials");



app.get("/", (req, res) => {
    res.render("HomePage");
});

app.get("/register", (req, res) => {
    res.render("RegisterPage");
});

app.get("/logIn", (req, res) => {
    res.render("LogInPage");
});

app.get("/secretPage", authenticateUser, (req, res) => {
    res.render("SecretPage");

});


app.get("/logOut", authenticateUser, async (req, res) => {
    try {
        const getLogInCookie = req.logInCookie;
        const getData = req.getData;

        console.log("Inside LogOut..");

        getData.tokenVal = await getData.tokenVal.filter((curVal, index) => curVal.firstToken !== getLogInCookie);

        res.clearCookie("LogIn_Cookie");

        await getData.save();

        console.log(getData);

        res.render("HomePage");

    } catch (err) {
        console.warn(err);
        // res.render("ErrorPage");
    }

});

app.get("*", (req, res) => {
    res.render("ErrorPage");
});





app.post("/register", async (req, res) => {
    try {
        // console.log("Fou..");
        const getFirstName = req.body.firstName;
        const getLastName = req.body.lastName;
        const getEmail = req.body.email;
        const getPassword = req.body.password;
        const getConfirmPassword = req.body.confirmPassword;
        const getPhone = req.body.phone;

        console.log(getFirstName);


        if (getPassword === getConfirmPassword) {

            console.log("Inside block..");

            const insertData = new userData({
                firstName: getFirstName,
                lastName: getLastName,
                email: getEmail,
                password: getPassword,
                confirmPassword: getConfirmPassword,
                phone: getPhone,
            });


            const getRegisterToken = await insertData.createRegisterToken();
            console.log("Register Token = " + getRegisterToken);

            res.cookie("Registration_Cookie", getRegisterToken);



            const getData = await insertData.save();

            console.log(getData);
            console.log("Registered Successfully!!");
            res.status(200).json("Registered Successfully!!");

            // res.render("HomePage");
        }
        else {
            console.log("Passwords Does Not Match..");
            res.status(404).json("Could not register, try again..");
            // res.render("ErrorPage");
        }

    } catch (err) {
        console.log(err);
        // res.render("ErrorPage");
    }
});


app.post("/logIn", async (req, res) => {
    try {
        const getEmail = req.body.email;
        const getPassword = req.body.password;

        const validateAccount = await userData.findOne({ email: getEmail });

        if (validateAccount) {
            const validatePassword = await bcrypt.compare(getPassword, validateAccount.password);

            if (validatePassword) {

                const getLogInToken = await validateAccount.createLogInToken();
                console.log("LogIn Token = " + getLogInToken);

                res.cookie("LogIn_Cookie", getLogInToken);

                console.log("Valid User, Logged In..");
                res.status(200).json("Logged In Successfully!! Welcome To The Oage..");
                // res.render("HomePage");
            }
            else {
                console.log("Incorrect Password..");
                res.status(404).json("Could not logIn, try again..");
                // res.render("ErrorPage");
            }
        }

    } catch (err) {
        console.log(err);
        // res.render("ErrorPage");
    }
});










app.listen(PORT, "127.0.0.1", () => {
    console.log("Server Started Successfully.. 👊👊");
});

