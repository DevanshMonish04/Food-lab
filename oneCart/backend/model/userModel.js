import mongoose, { Mongoose } from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
          type:String,
        required:true
    },
    password:{
        type:String
    },
    cartDate:{
        type:Object,
        default:{}

    }

},{timestamps:true,minimize:false})

const User=mongoose.model("User",userSchema)

export default User