import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    location: {
        type: String,
        required: true,
    },
    courses: {
        type: [String],
    },
    establishedYear: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    minCutOff: {
        type: String,
        index: true,
    }
}, { timestamps: true });

export const College = mongoose.model("College", collegeSchema);