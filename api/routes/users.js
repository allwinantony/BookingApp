import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router();

// router.get("/checkauthentication/:id", verifyToken, (req, res, next) => {
//     res.send("hello user, you are authenticated and logged in");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user, you are logged in and you can delete your account");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello admin, you can delete all the accounts");
// });

//update User
router.put("/:id", verifyUser, updateUser);

//delete User
router.delete("/:id", verifyUser, deleteUser);

//get a User
router.get("/:id", verifyUser,getUser);

//get all the Users
router.get("/", verifyAdmin,getUsers);

export default router;