import mongoose from "mongoose"

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    github: {
        type: String,
        trim: true,
    },
    linkedIn: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    summary: {
        type: String,
        trim: true,
    },
})

export const Profile = mongoose.model("Profile",profileSchema)