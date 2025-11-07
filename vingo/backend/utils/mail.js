import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendOtpMail=async (to,otp)=>{
  await transporter.sendMail({
    from:process.env.EMAIL,
    to,
    subject:"Reset your password",
    html:`<p>Your otp for password reset is <b>${otp}</b>.it expires in 5 minute</p>`
  })
}