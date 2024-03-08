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
        type: Number,
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
    return jwt.sign({ id: this._id, username: this.username }, process.env.ACCESS_TOKEN-SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}

collegeGoingSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

collegeGoingSchema.statics.findByCredentials = async function (username, password) {
    const user = await CollegeGoing.findOne({ username });
    if (!user) {
        return null;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return null;
    }
    return user;
}

collegeGoingSchema.statics.findByToken = async function (token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await CollegeGoing.findOne({ _id: decoded.id });
        return user;
    } catch (error) {
        return null;
    }
}



export const CollegeGoing = mongoose.model("CollegeGoing", collegeGoingSchema);