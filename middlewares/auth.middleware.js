import jwt  from "jsonwebtoken";
import APiError from "../utils/APiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        console.log(token)
    
        if(!token){
            throw new APiError(401,"Unauthorized Access")
        }
        // console.log("tetsing")
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new APiError(401,"Invalid Access Token")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new APiError(401,error?.message || "Invalid Auth") 
    }
})