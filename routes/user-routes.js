import express from 'express';
import { deleteUser, getAllUsers, getBookingsOfUser, getUserById, login, signUp, updateUser } from '../controllers/user-controller.js';


const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.put("/:id", updateUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id",deleteUser);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingsOfUser);
export default userRouter;