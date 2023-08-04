const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/vansh");

const db = mongoose.connection;

db.on('err',console.error.bind(console,"DB not connected"));

db.once('open',(err)=>{
    if(err){
        console.log("DB not Start");
        return false;
    }
    console.log("DB is connected");
})

module.exports = db;