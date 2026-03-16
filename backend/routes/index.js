/**
 * @file Manages all operations related to institutions
 * @author John Doe
 */
import express from "express";
import { getPersonInfo, getProgLangs } from "../controllers/index.js";

const router = express.Router();

router.get("/", getPersonInfo);
router.get("/progLangs", getProgLangs);

export default router;
