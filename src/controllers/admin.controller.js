import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {Admin} from "../models/admin.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const loginAdmin = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !password) {
        throw new ApiError(400, "Username or Password are required");
    }

    if (!(username.trim() === "prathamesh") && !(email.trim() === "prathamesh@gmail.com")) {
        throw new ApiError(400, "Invalid Username or Email");
    }

    if (username.trim() === "prathamesh" || email.trim() === "prathamesh@gmail.com") {
        if (!(password === "prathamesh123")) {
            throw new ApiError(400, "Invalid Password");
        }   
    }

    return res.status(200).json(
        new ApiResponse(200, "User Logged In Successfully")
    ); 
});

const logoutAdmin = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, {}, "User Logged Out Successfully")
    );
});

export {
    loginAdmin,
    logoutAdmin,
};