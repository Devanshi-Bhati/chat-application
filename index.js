const express = require("express");
const app = express();
const mongoose = require("mongoose");
let port = 8080;
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
// const Chat = require("./models/chat.js");
main()
.then(()=>{
    console.log("Connection successful");
})
.catch((err) =>{ console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.listen(port, ()=>{
    console.log("Server is listening on port 8080");
});

app.get("/",(req,res)=>{
    res.send("Root is working");
});

app.get("/chats", async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});
// let chat1 = new Chat({
//     from:"Neha",
//     to:"Chandni",
//     msg:"How have you been?",
//     created_at : new Date(),
// });
// chat1.save().then((res)=>{
//     console.log(res);
// });

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/chats", (req,res)=>{
    let {from, msg, to} = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to:to, 
        date : new Date()
    });
    newChat.save().then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let chat =  await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
app.put("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
 let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators:true, new:true});
 console.log(updatedChat);
 res.redirect("/chats");
});

app.delete("/chats/:id",async (req, res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});