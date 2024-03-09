import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { CollegeSearching } from "../models/collegeSearching.model.js";

export const verifyJWT_CS = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await CollegeSearching.findById(decodedToken?._id).select("-password");
    
        if (!user) {
            throw new ApiError(401, "Unauthorized");
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid Token");
    }
})

