const express =  require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs" );
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));

main().then(()=>{
console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}
//Index Route
app.get("/chats", async (req, res)=>{
  let chats = await Chat.find();
  console.log(chats);
  res.render("index.ejs",{chats});
});
//New Route 
app.get("/chats/new", (req, res)=>{
  res.render("new.ejs");
});
//Craete route 
app.post("/chats", (req, res)=>{
let {from, to, msg} = req.body;//parsing the data
//crating chat
let newChat = new Chat({
  from: from,
  msg : msg,
  to: to,
  created_at: new Date()
})
//print the crated chat and saved
newChat.save().then((res) => {//this is asynchronous if we use then so not add await
  console.log("chat was saved");
}).catch((err)=>{
  console.log(err);
});
res.redirect("/chats");
});

app.get("/", (req, res)=>{
    res.send("root is working");
});

app.listen(8080, () =>{
    console.log("server is listening on port 8080");
});