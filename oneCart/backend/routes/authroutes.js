import express from "express"
import { adminLogin, googleLogin, logIn, logOut, register } from "../controler/authcontroler.js"

let authRoute=express()

authRoute.post("/register",register)


authRoute.post("/login",logIn)

authRoute.get("/logout",logOut)

authRoute.post("/googlelogin",googleLogin)

authRoute.post("/adminlogin",adminLogin)

export default authRoute 