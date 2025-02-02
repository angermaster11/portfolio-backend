import multer from "multer"
import express from "express"
import updateProfile from "../controllers/profile.controller.js"



const router = express.Router();
const upload = multer(); // Handles form-data without files

// router.post("/register", upload.none(), registerUser); // Middleware for form-data
// router.post("/login", upload.none(), loginUser); // Middleware for form-data

// router.post("/logout",upload.none(), verifyJWT ,logoutUser);
router.post("/update",upload.none() ,updateProfile)

export default router;
