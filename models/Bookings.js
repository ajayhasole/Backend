import mongoose, { Mongoose } from "mongoose";
import { type } from "os";

const bookingSchema = new mongoose.Schema({
    movie:{
        type: mongoose.Types.ObjectId,
        ref:"Movie",
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
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    
})

export default mongoose.model("Booking", bookingSchema)