const express=require("express");
const {connection} =require("./db")
require("dotenv").config();
const cors=require("cors")
const userRoute =require("./Route/userRoute");
const { doctorRoute } = require("./Route/doctorRoute");
const app=express();
app.use(express.json());
app.use(cors())


app.get("/",(req,res)=>{
     res.status(200).send({"msg":"welcome to home page"})
})

app.use("/user",userRoute);
app.use("/doctor",doctorRoute)

app.listen(process.env.PORT,async()=>{
       try {
        await connection
        console.log("db file running")
          console.log("server is running")
       } catch (error) {
          console.log(error)
       }
})