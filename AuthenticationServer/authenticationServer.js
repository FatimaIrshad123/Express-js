
  const express = require("express")
  const PORT = 3000;
  const app = express();
  
  app.use(express.json())

let userDetail = [{UserId : 2,Username : "Fatima Irshad", Password : 123434, Firstname:"Fatima",Lastname:"Irshad"},
{UserId : 2,Username : "xyz", Password : 434, Firstname:"abc",Lastname:"zyx"}]

let UserAlreadyPresent = false;



function Login(req,res,next){
  let Username = req.body.username;
  let Password = req.body.password;
  let result = userDetail.find(a => a.Username === Username && a.Password === Password);
  if (result){
      res.json({msg:"You are loged in successfully"})
  }else{
      res.json({msg:'Signup plz'})
  }
   next()
}

function signup(req,res,next){
    const user = {
        UserId : Math.round(Math.random()*10),
        Username : req.body.username,
        Password : req.body.password,
        Firstname : req.body.firstname,
        Lastname : req.body.lastname
    } 
    for (let x in userDetail){
        if (userDetail[x].Username === user['Username']){
            UserAlreadyPresent = true;
            res.send('User already Registered')
          }
    }
    if(UserAlreadyPresent){
        
    }else {
             userDetail.push(user)
             res.json({'msg':'Updated'})
         }  
}

app.get('/data' , function(req,res){
  res.json(userDetail)
})

app.post('/login',Login)
app.post('/signup',signup)
