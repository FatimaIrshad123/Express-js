const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(express.json());

app.get('/',function(req,res){
    fs.readFile("data.js","utf-8",function(error,data){
        let newdata = JSON.parse(data);
        const myJSON = JSON.stringify(newdata);
        res.send(myJSON)
    })
})


app.get('/:id',function(req,res){
    fs.readFile("data.js","utf-8",function(error,data){
        let newdata = JSON.parse(data);
        newdata.filter(function(i) { 
            if (i.id == req.params.id){
                res.send(i)}
        })
    })
})

app.post('/',function(req,res){
    let data1 = {"title" : req.body.title,
    "description" : req.body.description,"complete":true,"id" : Math.round(Math.random()*10)}
    fs.readFile("data.js","utf-8",function(error,data){
        newdata = JSON.parse(data);
        newdata.push(data1);
        let x = JSON.stringify(newdata)
        fs.writeFile('data.js',x,function(error,data){  
        })
        res.json({'msg' : 'Updated'})
    })
  })

  app.put('/:id',function(req,res){
    let id = req.params.id
    fs.readFile("data.js","utf-8",function(error,data){
    let newdata = JSON.parse(data);
    var x = newdata.filter((i) => i.id == id)
   for (let e in x){
    let ind = newdata.indexOf(x[e]);
    newdata[ind] = req.body;
    let result = JSON.stringify(newdata)
        fs.writeFile('data.js',result,function(error,data){  
        })
    res.json({messages : 'Replaced'})
   }})
  })

  app.delete('/:id',function(req,res){
    let id = req.params.id
    fs.readFile("data.js","utf-8",function(error,data){
        let newdata = JSON.parse(data);
        var x = newdata.filter((i) => i.id == id);
    for (let e in x){
      let ind = newdata.indexOf(x[e]);
     newdata[ind] = []
     let result = JSON.stringify(newdata)
        fs.writeFile('data.js',result,function(error,data){  
        })
     }
     res.json({messages : 'Deleted'})
    })
  })
app.listen(port)