
  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require('path')
  const app = express();
  const port = 3000;
  app.use(bodyParser.json());
    
  let todo = [
     { "id" : 1, "title": "Buy groceries", "completed": false, description: "I should buy groceries" },
     { "id" : 2, "title": "cooking", "completed": false, description: "I should cook food"}
]
app.get('/todo/',function(req,res){
    res.json(todo);
})

app.get('/todo/:id',function(req,res){
  todo.filter(function(i) { 
    if (i.id == req.params.id){    
        return res.send(i);
     }
    })
})

app.post('/',function(req,res){
  let data = {id : Math.round(Math.random()*100),
  title : req.body.title,
description : req.body.description}
  todo.push(data);
  res.json(data)
})

app.put('/:id',function(req,res){
  let id = req.params.id
  var x = todo.filter((i) => i.id == id)
 for (let e in x){
  let ind = todo.indexOf(x[e]);
  todo[ind] = req.body
  res.json({messages : 'Replaced'})
 }
})

app.delete('/todo/:id',function(req,res){
  let id = req.params.id
  var x = todo.filter((i) => i.id == id);
  for (let e in x){
    let ind = todo.indexOf(x[e]);
   delete todo[ind]
    res.json({messages : 'Deleted'})
   }
})

app.listen(port)
  module.exports = app;
