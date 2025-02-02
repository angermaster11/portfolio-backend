import dotenv from "dotenv"
dotenv.config()
import {db_connection} from "../db/index.js"
import { app } from "./app.js";

db_connection()
.then(()=>{
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server started on port`,process.env.PORT);
    })

    app.get("/",(req,res)=>{
        res.status(200).send("Working.....")
    })
})
.catch((err)=>{
    console.log(err)
})
