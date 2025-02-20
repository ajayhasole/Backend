import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import Bookings from "../models/Bookings.js";


export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }


    if (!users) {
        return res.status(404).json({ message: "User Not Found" })
    }
    return res.status(200).json({ users })
}


export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "invalid inputs" }) //422: unprocessible entity

    }

    const hashedPassword = bcrypt.hashSync(password)
    let user;
    try {
        user = new User({ name, email, password: hashedPassword }); //will create new user at the schema (instance)
        user = await user.save();

    } catch (error) {
        return console.log(error);;
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(201).json({ id: user._id })

}


export const updateUser = async(req,res,next)=>{
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "invalid inputs" }) //422: unprocessible entity

    }
    const hashedPassword = bcrypt.hashSync(password)
    let user;
    try {
        user = await User.findByIdAndUpdate(id,{name, email, password: hashedPassword}); //this will automatically call .save() 

    } catch (error) {
        return console.log(error);
    }

    if(!user){
        return res.status(500).json({message:"Something went wrong"})
    }
    res.status(200).json({message:"Updated Successfully!"})
}


export const deleteUser = async(req,res,next)=>{
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "invalid inputs" }) //422: unprocessible entity

    }
    const hashedPassword = bcrypt.hashSync(password)
    let user;
    try {
        user = await User.findByIdAndDelete(id,{name, email, password: hashedPassword}); //this will automatically call .save() 

    } catch (error) {
        return console.log(error);
    }

    if(!user){
        return res.status(500).json({message:"Something went wrong"})
    }
    res.status(200).json({message:"User Deleted Successfully!"})

}


export const login = async(req,res,next)=>{
    const {email, password } = req.body;
    if ( !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "invalid inputs" }) //422: unprocessible entity
    }
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        res.status(404).json({message:"Unable to find the User"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password) 

    if (!isPasswordCorrect) {
        res.status(400).json({message:"Incorrect Password"});
    }

    res.status(200).json({message:"Login succesful! ", userId: existingUser._id})


}


export const getBookingsOfUser = async(req,res,next) => {
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Bookings.find({user: id})
    } catch (error) {
        console.log(error);
    }

    if(!bookings){
        return res.status(500).json({message:"unable to get Bookings"})
    }
    return res.status(200).json({bookings})
}


export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id);
    } catch (error) {
        console.log(error);
    }


    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    return res.status(200).json({ user })
}