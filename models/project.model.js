import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    
    projectName: {
        type: String,
        trim: true
    },
    projectDescription: {
        type: String,
        trim: true
    },
    projectTechnology: {
        type: String,
        trim: true
    },
    projectImage: {
        type: String,
        trim: true
    },
    projectGithub: {
        type: String,
        trim: true
    },
    projectDemo: {
        type: String,
        trim: true
    },
})

export const Project = mongoose.model("Project",projectSchema)