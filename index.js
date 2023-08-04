const express = require('express');

const port = 8100;

const  path = require('path');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

const app = express();

const multer = require('multer');

const uploads = path.join('uploads');

const flash = require('connect-flash');
const session = require('express-session');
const flashMiddleware = require('./config/flash');


app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));


app.use(express.urlencoded());      
const db = require('./config/mongoose');

app.use(session({
    secret : 'code',
    saveUninitialized : true,
    resave : true
}));

app.use(flash());
app.use(flashMiddleware.setFlash);

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Server is not start");
        return false;
    }
    console.log("Server is start port = "+port);

})