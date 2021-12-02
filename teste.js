const express=require("express");
const app=express();
const multer=require("multer");
const upload=multer({dest:"uploads/"});
app.post("/multer", upload.single("file"), function(req,res){
    console.log(req.file.filename);
});