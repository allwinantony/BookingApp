import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

// create Room
router.post("/:hotelid", verifyAdmin, createRoom);

//update Room
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//delete Room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//get a Room
router.get("/:id", getRoom);

//get all the Rooms
router.get("/", getRooms);

export default router;