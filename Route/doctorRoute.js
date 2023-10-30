const express=require("express");
const { DoctorModel } = require("../Model/doctoreModel");

const doctorRoute=express.Router();

doctorRoute.get("/",async(req,res)=>{
      const {specialization,sort,search}=req.query;
      let query={};

      if(specialization){
        query.specialization=specialization
      }
      if(search){
        query.$text={$search:search,$caseSensitive:false};
      }
      try {
        let doc= DoctorModel.find(query);
         if (sort==="date"){
            doc=doc.sort({date:1})
         }
          const result=await doc.exec();
          res.status(200).send(result)
      } catch (error) {
        res.status(400).send({"msg":error.message})
      }
})

module.exports={doctorRoute}