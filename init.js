const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(()=>{
    console.log("Connection successful");
})
.catch((err) =>{ console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allChats = [
    {
        from: 'Alice',
        to: 'Bob',
        msg: 'Hey Bob, how are you?',
        date: new Date(),
    },
    {
        from: 'Dev',
        to: 'Isha',
        msg: 'Good Morning',
        date: new Date(),
    },
    {
        from: 'Op',
        to: 'Chand',
        msg: 'Laughing out loud',
        date: new Date()
    }
];
Chat.insertMany(allChats);