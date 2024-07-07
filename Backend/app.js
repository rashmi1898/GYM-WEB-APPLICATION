import express from "express";
import {config} from "dotenv"
import cors from "cors";
import {sendEmail} from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

config({path: "./config.env"});
 
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["POST"],
  credentials: true
})
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

router.post("/send/mail", async(req,res,next)=>{
   const{name, email,phone, message} =req.body;
   if(!name || !email ||!phone ||!message){
    return next(res.status(400).json({
      success: true,
      message: "Please provide all details",
    })
  );
   }
   try {
     await sendEmail({
      email: "rashmiranjandashrrd2023@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      userEmail: email,
      userPhone:phone,
      message
     });
     res.status(200).json({
      success:true,
      message:"Message Send Successfully.",
     })
   } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
   }
   
});

app.use(router);

app.listen(process.env.PORT,()=>{
  console.log(`server listening at port ${process.env.PORT}`);
});











 