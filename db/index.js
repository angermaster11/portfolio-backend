import mongoose from "mongoose"
import DB_name from "../src/constants.js"


export const db_connection = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.URL}/${DB_name}`)
        console.log("Mongo DB is connected suceessfully on ",connection.connection.host)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}