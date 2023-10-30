const mongoose=require("mongoose");

const doctoreSchema= new mongoose.Schema({
    name:String,
    image:String,
    Specialization:String,
    experience:String,
    location:String,
    date:String,
    slots:Number,
    fee:Number
});

const DoctorModel=mongoose.model("doctor",doctoreSchema);

module.exports={DoctorModel}