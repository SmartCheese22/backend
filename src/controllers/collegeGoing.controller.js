import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { CollegeGoing } from "../models/collegeGoing.model";
import { ApiResponse } from "../utils/ApiResponse";

const registerCollegeGoing = asyncHandler(async (req, res) => {
    const { name, username, password, email, college, major, graduationYear, opinion } = req.body;

    if ([name, username, password, email, college, major, graduationYear].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await CollegeGoing.findOne({
        $or: [{ username }, { email }]
    });
    if (existedUser) {
        throw new ApiError(409, "User already exists!");
    }

    const user = await CollegeGoing.create({
        name,
        username,
        password,
        email,
        college,
        major,
        graduationYear,
        opinion
    });

    const createdUser = await CollegeGoing.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully!"));
});

const loginCollegeGoing = asyncHandler(async (req, res) => {

    const { email, username, password } = req.body

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await CollegeGoing.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not Exits!")
    }

    const Valid = user.password === password
    if (!Valid) {
        throw new ApiError(401, "Invalid User Credentials")
    }

    return res.status(200).json(new ApiResponse(200, user, "User logged in successfully!"));
});

export { registerCollegeGoing, loginCollegeGoing };