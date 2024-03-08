import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
    },college going
    // type: {
    //     type: String,
    //     enum: ['college-going', 'college-searching'],
    //     required: true,
    // },
    email: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
