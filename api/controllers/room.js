import Rooms from "../models/Rooms.js";
import Hotels from "../models/Hotels.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Rooms(req.body);

    try {
       const savedRoom = await newRoom.save();
       try {
           await Hotels.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id }
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Rooms.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });//{new:true} is for returning updated DB values to the request
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Rooms.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: { 
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
        });
        res.status(200).json("Room status has been updated");
    } catch (err) {
        next(err);
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Rooms.findByIdAndDelete(req.params.id);
        try {
            await Hotels.findByIdAndUpdate(hotelId, {
                 $pull: { rooms: req.params.id }
             });
         } catch (err) {
             next(err);
         }
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        next(err);
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const room = await Rooms.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
}

export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Rooms.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
}