import jwt from "jsonwebtoken"


const adminAuth=async(req,resizeBy,next)=>{

    try{
            let {token}=req.cookies

    if(token){
        return res.status(400).json({message:"not autharized login again"})
    }

    let verifyToken=jwt.verify(token,process.env.JWT_SECRET)

    if(!verifyToken){
        return res.status(400).json({message:"not autharized Login Again,Invalid token"})
    }

    req.adminEmail=process.env.ADMIN_EMAIL

    next()

    }
    catch(error){
         console.log("Admin auth error")
        return res.status(500).json({message:`admin auth error ${error}`})


    }

}

export default adminAuth