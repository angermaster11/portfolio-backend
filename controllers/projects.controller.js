import { asyncHandler } from "../utils/asyncHandler.js";
import APiError from "../utils/APiError.js"
import APiResponse from "../utils/APiResponse.js"
import {Profile}  from "../models/profile.model.js"
import {Project}  from "../models/project.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

const projects = asyncHandler(async (req,res)=>{
    let userId = "anger"
    const project = await Project.find({})
    console.log(project)

    return res.status(200).json({ success: true, message: project })
})

export default projects