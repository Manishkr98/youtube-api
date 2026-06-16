import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const exitedUser = User.findOne({
    $or: [{ email }, { username }],
  });
  if(exitedUser){
    throw new ApiError(409, "user with email or username alredy exists.")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0].path;

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
       throw new ApiError(400, "Avatar file is required")
  }

  const user = await User.create({
    fullname,
    email,
    username:username.toLowerCase(),
    avatar:avatar.url,
    coverImage:coverImage?.url || ""
  })
 
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if(!createdUser){
       throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser, "User register Successfully")
  )




});

export { registerUser };
