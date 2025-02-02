import multer from "multer";
import express from "express";
import registerUser, { logoutUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import updateProfile from "../controllers/profile.controller.js"
import addProject from "../controllers/project.controller.js";
import about from "../controllers/about.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import projects from "../controllers/projects.controller.js";

const up = multer({ dest: "uploads/"})
const router = express.Router();
// const upload = multer(); // Handles form-data without files

router.post("/register", upload.none(), registerUser); // Middleware for form-data
router.post("/login", upload.none(), loginUser); // Middleware for form-data
router.post("/about", upload.none(), about); // Middleware for form-data
router.post("/project", upload.none(), projects); // Middleware for form-data
router.get("/dashboard", verifyJWT, (req, res) => {
    // If the JWT is verified, send the profile page or dashboard
    res.send("Welcome to the dashboard!");
  });
  
router.post("/logout",upload.none(), verifyJWT ,logoutUser);
router.post("/update",up.single("profilePic"),updateProfile)
router.post("/addProject",up.single("projectImage"),addProject)

export default router;
