import express from "express";
import { deleteBooking, getBooking, newBooking } from "../controllers/booking-controller.js";

const bookingsRouter = express.Router();

bookingsRouter.post('/', newBooking);
bookingsRouter.delete('/:id', deleteBooking);
bookingsRouter.get('/:id',getBooking);



export default bookingsRouter;