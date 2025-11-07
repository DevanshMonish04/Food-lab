import React, {  useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

function SignUp() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword,setShowPassword]=useState(false)
  const [role,setRole]=useState("")
  const navigate=useNavigate()
  const[fullName,setFullName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[mobile,setMobile]=useState("")


  const handleSignup=async()=>{
    try{
    const result=await axios.post(`${serverUrl}/api/auth/signup`,{
      fullName,email,password,mobile},
    {withCredentials:true})
    console.log(result)

    }catch(error){
      console.log(error)

    }
  }


  const handleGoogleAuth=async()=>{
    if(!mobile){
      return alert("mobile no is required")
    }
    const provider=new GoogleAuthProvider()
    const result=await signInWithPopup(auth,provider)
    try {
      const result=await axios(`${serverUrl}/api/auth/google-auth`,{})
    } catch (error) {
      
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{
            color: primaryColor,
          }}
        >
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries
        </p>

        {/* fullName */}

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-l"
          >
            FullName
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="enter your name"
            style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setFullName(e.target.value)} value={fullName}
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-l"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="enter email"
            style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setEmail(e.target.value)} value={email}
          />
        </div>
        {/* Mobile NUmber  */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-l"
          >
            Mobile
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="enter your contact number"
            style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setMobile(e.target.value)} value={mobile}
          />
        </div>
        {/* password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-l"
          >
            Password
              </label>
          <div className="relative ">
            <input
              type={showPassword?"text":"password"}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              placeholder="enter password"
              style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setPassword(e.target.value)} value={password}
            />
                      <button className="absolute cursor-pointer right-3 top-[14px] text-gray-500" onClick={()=>setShowPassword(prev=>!prev)} >{!showPassword?<FaEye/>:<FaEyeSlash/>}</button>
          </div>
        </div>

        {/* role */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-l"
          >
            Role
              </label>
          <div className="flex gap-2">
     {["user","owner","deliveryboy"].map((r)=>(
  <button 
    key={r}  // ✅ unique key
    className="flex-1 border rounded-lg px-3 py-2 text-center
    font-medium transition-colors cursor-pointer"
    onClick={()=>setRole(r)}
    style={
      role===r
      ? {backgroundColor:primaryColor,color:"white"}
      : {border:`1px solid ${primaryColor}`,color:primaryColor}
    }
  >
    {r}
  </button>
))}

                    
          </div>
        </div>

         <button className={`w-full font-semibold py-2 
         rounded-lg transition duration-200
         bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignup}>
        SignUp

      </button>
      <button  className="w-full mt-4 flex items-center justify-center gap-2 border
      rounded-lg cursor-pointer px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100" onClick={handleGoogleAuth}>
        <FcGoogle size={20}/>
        <span>Sign Up with Google</span>
      </button>
      <p className="text-center mt-6 cursor-pointer" onClick={()=>navigate("/signin")}>
        Already have an account?
        <span className="text-[#ff4d2d]">Sign In</span></p>



      </div>
     
    </div>
  );
}

export default SignUp;
