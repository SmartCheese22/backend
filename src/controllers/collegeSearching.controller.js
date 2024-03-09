import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { CollegeSearching } from "../models/collegeSearching.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessToken = async (userId) => {
    try {
        const user = await CollegeSearching.findById(userId);
        const accessToken = user.generateToken();

        await user.save({ validateBeforeSave: false });

        return accessToken;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the access token");
    }
}

const registerCollegeSearching = asyncHandler(async (req, res) => {
    const { name, username, password, email } = req.body;

    if (
        [name, username, password, email].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await CollegeSearching.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(400, "Username or Email already exists");
    }

    const user = await CollegeSearching.create({
        name,
        username,
        password,
        email,
    });

    const createdUser = await CollegeSearching.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something when wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User Registered Successfully")
    );
});

const loginCollegeSearching = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !password) {
        throw new ApiError(400, "Username or Password are required");
    }

    const user = await CollegeSearching.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User Credentials");
    }

    const accessToken = await generateAccessToken(user._id)

    const loggedInUser = await CollegeSearching.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200).cookie("accessToken", accessToken, options).json(
        new ApiResponse(200, {
            user: loggedInUser,
            accessToken,
        }, "User Logged In Successfully")
    );

});

const logoutCollegeSearching = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200).clearCookie("accessToken", options).json(
        new ApiResponse(200, {}, "User Logged Out Successfully")
    );
});

export {
    registerCollegeSearching,
    loginCollegeSearching,
    logoutCollegeSearching,
};