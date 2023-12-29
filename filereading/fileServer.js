
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000

app.get('/files',function(req,res){
  fs.readdir('./files/',function(err,files){
    res.send(files)
})
})

app.get('/files/:filename',function(req,res){
let filename = path.join(__dirname,'./files/',req.params.filename);
fs.readFile(filename,'utf-8',function(error,data){
  if (error){
    res.status(404).send("File not found")
  }
  else{
    res.json({msg : data})
  }
})
})
app.listen(port);
