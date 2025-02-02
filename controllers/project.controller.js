import { asyncHandler } from "../utils/asyncHandler.js";
import APiError from "../utils/APiError.js"
import APiResponse from "../utils/APiResponse.js"
import {Profile}  from "../models/profile.model.js"
import {Project}  from "../models/project.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

const addProject = asyncHandler(async (req,res)=>{
    // const data = req.body
    // const projectName = data.project.projectName
    // const projectDescription = data.project.projectDescription
    // const projectTechnology = data.project.projectTechnology
    // const projectDemo = data.project.projectDemo 
    // const projectGithub = data.project.projectGithub


    // console.log(data)
    // console.log("---------------------")
    // console.log(projectName)
    const {projectName,projectDescription,projectTechnology,projectGithub,projectDemo} = req.body
    console.log(projectName)
    console.log(req.body)

    let thumbnail = ""
    console.log(req.file)
    if(req.file){
        console.log("yaha hu ")
        thumbnail = req.file?.path
    }
    console.log(thumbnail)    
    let projectImage = ""
    if(thumbnail){
        let data = await uploadOnCloudinary(thumbnail)
        projectImage = data.url
    }
    console.log(thumbnail)
    console.log(projectImage)

    const project = await Project.create({projectName,projectDescription,projectTechnology,projectImage,projectGithub,projectDemo})
    const createdUser = await Project.findById(project._id)
    console.log(createdUser)
    if(!createdUser){
        throw new APiError(500,"Somethings wents wrong")
    }

    return res.status(200).json({ success: true, message: "Project Added Successfully!" })


})

export default addProject