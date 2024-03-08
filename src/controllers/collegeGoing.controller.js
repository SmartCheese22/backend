import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { CollegeGoing } from "../models/collegeGoing.model";
import { ApiResponse } from "../utils/ApiResponse";

const registerCollegeGoing = asyncHandler(async (req, res, next) => {
    const { name, username, password, email, college, major, graduationYear, opinion } = req.body;
    
    if (
        [name, username, password, email, college, major, graduationYear, opinion].some((field) => field?.trim() === "") 
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existeduser = CollegeGoing.findOne({
        $or: [{ username }, { email }],
    });

    if (existeduser) {
        throw new ApiError(400, "User already exists");
    }

    const user = await CollegeGoing.create({
        name,
        username,
        password,
        email,
        college,
        major,
        graduationYear,
        opinion,
    });

    const token = user.generateToken();

    new ApiResponse(res).send({ user, token });

    next();



})

export { registerCollegeGoing }

