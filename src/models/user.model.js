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
    },
    type: {
        type: String,
        enum: ['college-going', 'college-searching'],
        required: true,
    },
    air: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: function () {
            return this.type === 'college-going';
        }
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: function () {
            return this.type === 'college-going';
        }
    },
    yearJoining: {
        type: String,
        required: function () {
            return this.type === 'college-going';
        }
    },
    mobileNo: {
        type: String,
        required: function () {
            return this.type === 'college-going';
        }
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
