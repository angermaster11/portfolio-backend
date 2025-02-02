import { asyncHandler } from "../utils/asyncHandler.js";
import APiError from "../utils/APiError.js"
import APiResponse from "../utils/APiResponse.js"
import {Profile}  from "../models/profile.model.js"
import {Project}  from "../models/project.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

const about = asyncHandler(async (req,res)=>{
    let userId = "anger"
    const profile = await Profile.findOne({userId})
    console.log(profile)

    return res.status(200).json({ success: true, message: profile })
})

export default about