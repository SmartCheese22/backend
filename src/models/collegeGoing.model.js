import mongoose from "mongoose";

const collegeGoingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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

export const CollegeGoing = mongoose.model("CollegeGoing", collegeGoingSchema);