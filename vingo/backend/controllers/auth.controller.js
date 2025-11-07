import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"
import { sendOtpMail } from "../utils/mail.js"

 export const signUp=async(req,res)=>{
    try{
        const {fullName,email,password,mobile,role}=req.body
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user already exist."})
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be 6 character."})
        }
        if(mobile.length<10){
            return res.status(400).json({message:"mobile number must be 10 digits."})
        }

        const hashedPassword=await bcrypt.hash(password,10)
        // ----create user----
        user= await User.create({
            fullName,
            email,
            password:hashedPassword,
            role,
            mobile
        })
        //--generate token--

        const token=await genToken(user._id)
        //--pass token in cookies--

        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })
            return res.status(201).json(user)
    }catch(error){
            return res.status(500).json(`sign up error ${error}`)
    }
 }

  export const signIn=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user does not exist."})
        }

        //compare password with user password 
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }
     
        //--generate token--
        const token=await genToken(user._id)

        //--pass token in cookies--
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })
            return res.status(200).json(user)
    }catch(error){
            return res.status(500).json(`sign In error ${error}`)
    }
 }

 export const signOut=async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"log out successfully"})

    }catch(error){
        return res.status(500).json(`log out error ${error}`)

    }

 }

 export const sendOtp=async(req,res)=>{
    try{
        const {email}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user does not exist"})
        }
        const otp=Math.floor(1000+Math.random()*9000).toString()
        user.resetOtp=otp

        user.otpExpire=Date.now()+5*60*1000

        user.isotpVerified=false
        await user.save()
        await sendOtpMail(email,otp)
        return res.status(200).json({message:"otp send successfully"})
    }catch(error){
        return res.status(500).json(`send otp error ${error}`)
    }
}

export const verifyOtp=async(req,res)=>{
    try {
        const {email,otp}=req.body
        const user=await User.findOne({email})

        if(!user || user.resetOtp!=otp || user.otpExpire<Date.now()){
            return res.status(400).json({message:"invalid/expire otp"})
        }
        user.isotpVerified=true
        user.resetOtp=undefined
        user.otpExpire=undefined
        await user.save()

        return res.status(200).json({message:"otp verified successfully"})

    } catch (error) {
          return res.status(500).json(`verify otp error ${error}`)
        
    }
}


export const resetPassword=async(req,res)=>{
    try {
        const {email,newpassword}=req.body
        const user=await User.findOne({email})
         if(!user ||!user.isotpVerified){
            return res.status(400).json({message:"otp verification required"})
        }
        const hashedPassword=await bcrypt.hash(newpassword,10)
        user.password=hashedPassword
        user.isotpVerified=false
        await user.save()
          return res.status(200).json({message:"reset password  successfully"})
    } catch (error) {
                  return res.status(500).json(`reset password  error ${error}`)
        
    }
}
 

export const googleAuth=async(req,res)=>{
    try {
        const{fullName,email,mobile}=req.body

        let user=await User.findOne({email})
        if(!user){
            user=await User.create({
                fullName,email,mobile
            })
        }
         //--generate token--
        const token=await genToken(user._id)

        //--pass token in cookies--
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })
            return res.status(200).json(user)


    } catch (error) {
              return res.status(500).json(`google auth error ${error}`)
    }
}