const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const documentSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        uppercase: true,
        minLength: 2,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email Toh Check Kar Leti..");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 2,
    },
    confirmPassword: {
        type: "String",
        required: true,
        minLength: 2,
    },
    phone: {
        type: Number,
        required: true,
    },
    tokenVal:[{
        firstToken:{
            type: String,
            required: true,
        }
    }],
});



documentSchema.methods.createRegisterToken = async function(){
    try{
        const getRegisterToken = await jwt.sign({ id: this._id.toString()}, "bulldoglabradordhinkachikachika");

        this.tokenVal = await this.tokenVal.concat({firstToken: getRegisterToken});

        return getRegisterToken;

    }catch(err){
        console.warn(err);
    }

};


documentSchema.methods.createLogInToken = async function(){
    try{
        const getLogInToken = await jwt.sign({id: this._id.toString()}, "bulldoglabradordhinkachikachika");

        this.tokenVal = await this.tokenVal.concat({firstToken: getLogInToken});

        await this.save();

        return getLogInToken;

    }catch(err){
        console.warn(err);
    }
};






documentSchema.pre("save", async function(next){

    try{
        if(this.isModified("password"))
        {
            this.password = await bcrypt.hash(this.password, 10);
            this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
        }
        next();

    }catch(err){
        console.warn(err);
    }

});



const createCollection = new mongoose.model("userCollection", documentSchema);

module.exports = createCollection;