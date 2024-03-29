import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const collegeGoingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    email: {
        type: String,
        required: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: "College",
        required: [true, "College is Required"],
    },
    major: {
        type: String,
        required: true,
    },
    graduationYear: {
        type: String,
        required: true,
    },
    opinion: {
        type: [String],
    },
}, { timestamps: true });

collegeGoingSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

collegeGoingSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

collegeGoingSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id, username: this.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}

collegeGoingSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

export const CollegeGoing = mongoose.model("CollegeGoing", collegeGoingSchema);