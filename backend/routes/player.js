/**
 * @file Manages all operations related to institutions
 * @author att
 */
import express from "express";
 

import {
  createPlayer,
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
} from "../controllers/player.js";

const router = express.Router();

router.post("/", createPlayer);
router.get("/", getPlayers);
router.get("/:id", getPlayer);
router.put("/:id", updatePlayer);
router.put("/", (req, res) => {
  return res.status(400).json({
    message: "id is required in the URL parameter",
  });
});

router.delete("/:id", deletePlayer);
router.delete("/", (req, res) => {
  return res.status(400).json({
    message: "id is required in the URL parameter",
  });
});
// You can also chain routes like this:
// router.route("/").post(createInstitution).get(getInstitutions);

export default router;