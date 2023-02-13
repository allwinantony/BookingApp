import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser"
import cors from "cors";

const app = express()
dotenv.config()

mongoose.set('strictQuery', false);

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB")
    } catch (error) {
        throw error;
    }
};
// code line-18 to 23 is for connecting to mongoDB again and again its own if mongoDB gets disconnected
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected");
})
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected");
})

app.get("/", (req,res)=>{
    res.send("hello first request")
})

//middlewares
app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong";
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    });
});

app.listen(8800,()=>{
    connect();
    console.log("backend is running now!!!");
})