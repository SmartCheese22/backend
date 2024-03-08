import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
// import { emit } from "nodemon";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, username, password, email } = req.body;

    if ([name, password, email].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "Name, password, and email are required");
    }

    // Check if username is provided before calling toLowerCase()
    const lowercaseUsername = username ? username.toLowerCase() : undefined;

    const existedUser = await User.findOne({
        $or: [{ username: lowercaseUsername }, { email }]
    });
    if (existedUser) {
        throw new ApiError(409, "User already exists!");
    }

    const user = await User.create({
        name,
        username: lowercaseUsername,
        password,
        email,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully!"));
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, username, password } = req.body

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not Exits!")
    }

    const Valid = user.password === password
    if (!Valid) {
        throw new ApiError(401, "Invalid User Credentials")
    }

    const loggedInUser = await User.findById(user._id).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200, {
                user: loggedInUser
            },
                "User Logged In Successfully!"
            )
        )

})

 
// const logoutUser = asyncHandler(async (req, res) => {
//     await User.findByIdAndUpdate(
//         req.user._id,
//         {
//             $set: {

//             }
//         },
//         {
//             new: true
//         }
//     )

// return res
//     .status(200)
//     .json(new ApiResponse(200, {}, "user Logged Out Successfully"))
// })


export {
    registerUser,
    loginUser,
    // logoutUser
}