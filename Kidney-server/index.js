const express = require('express')
const app = express();
const port = 3000;


var users = [{
    name:'john',kidneys :[
        {healthy : false}]
}]
app.use(express.json())

app.get('/', function(req,res){
    const johnkidneys = users[0].kidneys;
    const numberOfKidney = johnkidneys.length;
    //let healthyKidneys = 0;
    let healthyKidneys = johnkidneys.filter((i) => i.healthy)
    healthyKidneys = healthyKidneys.length ;
    // for (let i = 0; i < johnkidneys.length; i++){
    //     if (johnkidneys[i].healthy){
    //         healthyKidneys = healthyKidneys + 1
    //     }
    // }
    
    const numberOfUnhealthyKidney = numberOfKidney - healthyKidneys;
    res.json({
        
        numberOfKidney,
        healthyKidneys,
        numberOfUnhealthyKidney
    })
})

app.post('/', function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy
    })
    res.json({
        message : 'Done!'
    })
    
})

app.put('/', function(req,res){
    for (let i = 0; i < users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        message : "Replaced"
    })
})

app.delete('/', function(req,res){
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++){
        if (users[0].kidneys.healthy){
            newKidneys.push({
                healthy : true
            })
        }
    }
    users[0].kidneys = newKidneys
    res.json({
        msg : "Done"
    })
})


app.listen(3000 , () => {
    console.log(`Lets begin with port ${port}`)
})