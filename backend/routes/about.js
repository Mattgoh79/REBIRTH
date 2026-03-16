/**
 * @file Manages all operations related to institutions
 * @author John Doe
 */
import express from "express";

// Import the index controllers module
import { getMyInfo } from "../controllers/about.js";

// Create an Express router
const router = express.Router();

// Create a GET routes
router.get("/", getMyInfo); // The first argument is the route path, the second argument is the controller function

// Export the router
export default router;
