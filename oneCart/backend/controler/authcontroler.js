import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";



export const register=async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        const existUser=await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"user already exist"})

        }

        if(!validator.isEmail(email)){
              return res.status(400).json({message:"enter valid email"})
        }

        if(password.length<8){
              return res.status(400).json({message:"enter strong password"})

        }
        let hashPass=await bcrypt.hash(password,10)

        const user=await User.create({name,email,password:hashPass})

        let token=await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(201).json(user)
    }catch(error){
        console.log("signup error")
        return res.status(500).json({message:`register error ${error}`})

    }
} 

export const logIn=async(req,res)=>{
    try{
    let {email,password}=req.body;

    let user=await User.findOne({email})
    if(!user){
            return res.status(404).json({message:"user not found"})

    }
    let isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
            return res.status(400).json({message:"incorrect password..."})
    }
     let token=await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(201).json({message:" login successful"})
    }
    catch(error){
         console.log("login error")
        return res.status(500).json({message:`login error ${error}`})


    }
}



export const logOut= async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"logout successful"})
    }
    catch(error){
        console.log("logout error ")
        return res.status(500).json({message:`logout error ${error}`})
    }


}


export const googleLogin=async (req,res)=>{
    try{
        let {name,email}=req.body;
    let user=await User.findOne({email})

        if(!user){
            user=await User.create({
                name,email
            })
        }

    
 
     let token=await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({message:" login successful"})

    }catch(error){
          console.log("google login  error")
        return res.status(500).json({message:`login error ${error}`})


    }
}


 export const adminLogin=async(req,res)=>{
    try{
        let {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        let  token=await genToken1(email)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:1*24*60*60*1000
        })

        return res.status(200).json(token)

        }
        return res.status(400).json({message:"invalid credential"})

    }catch(error){
        console.log("login error by admin")
        return res.status(500).json({message:"adminlogin error"})

    }
}