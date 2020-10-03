const express=require("express");
const path=require("path");
const hbs=require("hbs");
const response=require("express");
const meaning=require("./utils/request")


const app=express();
const port= process.env.PORT || 3000;
const staticPath=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")
hbs.registerPartials(partialsPath);
app.set('view engine','hbs');
app.set('views',viewsPath);

app.use(express.static(staticPath));

app.get("",(req,res)=>{
    res.render("index");
})

app.get("/about",(req,res)=>{
    res.render("about",{
        name:"Shubham",
        desc:"I am a Freelancer at Up Work and Love to make User Interactive Applications.This application is just a teaser of my Talent :)" 
       });
})

app.get("/help",(req,res)=>{
    res.render("help",{
        desc:"this App will help you to find the meaning of a word. Components used to make this app are Node.js,Express,Vanilla java script,Bootstrap,Html ",
    });
})

app.get("/dict",(req,res)=>{
    if(!req.query.word){
        return res.send({
            error:"Please enter a word",
        })
    }
    meaning.meaning(req.query.word,(error,data)=>{
       if(error){
           return res.send({error:error})
        }
        else{
            return res.send(data)
        }

    })
})
app.get("*",(req,res)=>{
    res.render("404",{
        name:"404 Page not found",
    })
})

app.listen(port,()=>{
    console.log("server up on port"+port);
})