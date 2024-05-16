import mongoose, { Mongoose } from "mongoose";
import { type } from "os";

const bookingSchema = new mongoose.Schema({
    movie:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        required: true
    },
    seatNumber:{
        type: Number,
        required: true
    },
    user:{
        type: String,
        required: true
    },
})

export default mongoose.model("Booking", bookingSchema)