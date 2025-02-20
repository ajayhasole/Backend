import Admin from "../models/Admin.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const addAdmin = async (req,res,next)=>{
    const {email, password} = req.body;

    if(!email && email.trim()== "" && !password && password.trim()== ""){
        return res.status(422).json({message:"Invalid Inputs"})
    }

    let existingAdmin;  
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (error) {
        console.log(error);
    }

    if(existingAdmin){
        return res.status(400).json({message: "Admin already exists!"});
    }   
 

    let admin;
    const hashedPassword = bcrypt.hashSync(password);

    try {
        admin = new Admin({email, password: hashedPassword});
        admin = await admin.save();
    } catch (error) {
        return console.log(error);
    }

    if(!admin){
        res.status(500).json({message:"Unable to store admin"})
    }
    return res.status(201).json({ admin});
};



export const adminLogin = async(req,res,next) =>{
    const {email, password} = req.body;
           console.log(email)
    if(!email || email.trim()== "" || !password || password.trim()== ""){
        return res.status(422).json({message:"Invalid Inputs"})
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(!existingAdmin){
        return res.status(400).json({message:"Admin not found"});
    }


    const isPassword = bcrypt.compareSync(password, existingAdmin.password);

    if(!isPassword){
        return res.status(400).json({message:"Incorrect Password"});
    }

    const token = jwt.sign({ id:existingAdmin._id }, process.env.SECRET_KEY, { expiresIn: "7d" })

    if(isPassword){
        return res.status(200).json({message:"Successfully Logged In", token,id:existingAdmin._id});
    }

}


export const getAdmins = async(req,res,next)=>{
    let admins;
    
    try {
        admins = await Admin.find();
    } catch (error) {
        console.log(error);
    }
    if(!admins){
        return res.status(404).json({message:"There are no Admins/ faulty Admin value"});
    }
    return res.status(200).json({admins})

}
