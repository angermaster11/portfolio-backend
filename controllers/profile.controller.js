import { asyncHandler } from "../utils/asyncHandler.js";
import APiError from "../utils/APiError.js"
import APiResponse from "../utils/APiResponse.js"
import {Profile}  from "../models/profile.model.js"
import {Project}  from "../models/project.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

const updateProfile = asyncHandler(async (req,res)=>{
    // const data = req.body
    // const name = data.profile.name
    // const title = data.profile.title
    // const phone = data.profile.phone
    // const email = data.profile.email
    // const github = data.profile.github
    // const linkedIn = data.profile.linkedIn
    // const summary = data.profile.summary
    const {name,title,phone,email,github,linkedIn,summary} = req.body

    let userId = "anger"
    let profilePic = ""
    if (req.file) {
        profilePic = req.file?.path;
    } else {
        console.log('No image found or file not uploaded');
    }

    let image= ""
    if(profilePic){
        let data = await uploadOnCloudinary(profilePic)
        image = data.url
    }else{
        image = ""
    }


    const updateData = Object.fromEntries(
        Object.entries({ name, title, phone, email, github, linkedIn,  summary,image })
            .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    )

    console.log("checking...................................////////////./.")
    console.log(updateData)

    const exitedUser = await Profile.findOne({userId})
    if(exitedUser){
        const updatedProfile = await Profile.findOneAndUpdate(
            {userId},
            {$set: updateData},
            { new: true, runValidators: true }
        )

        const test = await Profile.findById(updateProfile._id)
        console.log(test)

        if(updateProfile){
            console.log(updateProfile)
            console.log("updated succesfully")
        }
    }else{
        const profileUser = await Profile.create({
            name,userId,title,phone,email,github,linkedIn,image,summary
        })

        const createdUser = await Profile.findById(profileUser._id)
        if(createdUser){
            console.log("User Created Successfully")
        }else{
            throw new APiError(500,"Somethings wents Wrong")
        }
    }
    // console.log(req.body)
    console.log("testing")

    return res.status(200).json({ success: true, message: "Profile updated successfully!" })
})

export default updateProfile