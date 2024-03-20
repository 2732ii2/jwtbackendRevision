

import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
const secretKey="bilalabbas";


const app=express();
app.use(express.json());

// this middle ware is going to check when a user trying to hit a unwritten route.
app.use((req,res,next)=>{
    // console.log(req.url !="/user");
    if(req.url != "/" && req.url != "/user" && req.url != "/sign-in" ){
        res.json({msg:"sorry 404! error"});
        return ;
    }
    else {
        next();
    }
})

app.get("/",(req,res)=>{
    res.send("<h1>server is running perfectly</h1>")
})

const userList=["ashad","aman","ashraf","anas"];

// let's make it simple bcryption must and should done at the timing of 
// register  or sign-in 
// not at the time of logged in

// because at the timing of logged in you have to bcrypt it and then verify and try to logged in.

app.post("/sign-in",async(req,res)=>{
    const {username,password}=req.body;
    console.log(username,password);
        //bcrypting your password ;
     const bcryptedPassword= await bcrypt.hash(password,10);
     const comparingvalue=await   bcrypt.compare("password",bcryptedPassword);
     console.log(comparingvalue);
    console.log(bcryptedPassword);
    if (userList.includes(username)){
        //then return a token back 
        const token =jsonwebtoken.sign({"username":username,"password":bcryptedPassword},secretKey);
        console.log(token);
        res.json({token});
    }
    else{
        // say user is not authorized;
        res.json({msg:"user is not authorized"});
    }
})
app.post("/user",(req,res)=>{
    try{
        const {authorization}=(req.headers);
        console.log(authorization);
        const verification =jsonwebtoken.verify(authorization,secretKey);
        console.log(verification);
        if(userList.includes(verification.username)){
            res.json({"userList":userList.filter(e=>{
                if(e!=verification.username) return e;
            })})
            return ;
        }
    }
    catch(e){
        res.json({err:e.message})
    }
})
// app.use((err,req,res,next)=>{
//     if(err){
//         res.json({err:err.message});
//     }
// })
app.listen(4000);