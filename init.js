const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(()=>{
console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}

let allchats = [
    {
        from:"riya",
        to: "siya",
        msg:"send me your exam sheet",
        created_at: new Date()
    },
    {
        from:"Ram",
        to: "shyam",
        msg:"Hope! you are fine.",
        created_at: new Date()
    },
    {
        from:"Mohan",
        to: "Sohan",
        msg:"Hey buddy you are to good.",
        created_at: new Date()
    },
    {
        from:"priya",
        to: "Radhika",
        msg:"All the best for exam..",
        created_at: new Date()
    },

];

Chat.insertMany(allchats);
