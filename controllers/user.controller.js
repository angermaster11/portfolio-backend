import { asyncHandler } from "../utils/asyncHandler.js";
import APiError from "../utils/APiError.js"
import APiResponse from "../utils/APiResponse.js"
import { User } from "../models/user.model.js"

const generateToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return {accessToken,refreshToken}

    } catch (error) {
        throw new APiError(500,"Somethings wents Wrong while generating refresh and access token.")
    }
}

const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body
    console.log(req.body)
    
    if(
        [username,email,password].some((field)=>
        field?.trim()=="")){
            throw new APiError(400,"All fields are required")
        }

    const exitedUser = await User.findOne({
        $or: [{ email },{ username }]
    })

    if(exitedUser){
        throw new APiError(402,"User already Exists")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    console.log(createdUser)
    if(!createdUser){
        throw new APiError(500,"SOmething wents Wrong")
    }

    return res.status(200).json(
        new APiResponse(200,createdUser,"User Registered Successfully")
    )
    
})

const loginUser = asyncHandler(async (req,res)=>{
    // req body -> data
    // username or email
    // find the user
    // password check
    // access token and refresh token
    // send cookies

    const { email, username, password } = req.body
    if(!username && !email){
        throw new APiError(400,"Username or Email is required.")
    }
    console.log(password)

    const user = await User.findOne({
        $or: [{username},{email}]
    })
    console.log(user)

    if(!user){
        throw new APiError(404,"User does not exists")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    console.log(isPasswordValid)

    if(!isPasswordValid){
        throw new APiError(401,"Invalid user credentials")
    }

    const { accessToken,refreshToken } = await generateToken(user._id)

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new APiResponse(
            200,
            {
                user: loggedUser, accessToken, refreshToken
            },
            "User logged in Successfully"
        )
    )

})

const logoutUser = asyncHandler(async (req, res) => {
    try {
        // Remove refresh token from the user
        await User.findByIdAndUpdate(
            req.user._id,
            { $set: { refreshToken: undefined } },
            { new: true }
        );

        // Clear cookies for access and refresh tokens
        const options = {
            httpOnly: true,
            secure: true, // Set to false in development if you're not using https
            sameSite: "lax",
        };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new APiResponse(200, {}, "User logged out successfully"));
    } catch (error) {
        throw new APiError(500, "Something went wrong while logging out");
    }
});


export default registerUser
export  {loginUser, logoutUser}