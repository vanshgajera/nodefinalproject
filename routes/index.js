const express = require('express');

routes = express.Router();

const path = require('path');
const multer = require('multer');
const uploads = path.join('uploads');

// const flash = require('connect-flash');
// const session = require('express-session');


console.log("index routing is working");

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,uploads)
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+ '-'+Date.now())
    }
})

const imageUpload = multer({storage : storage}).single('avatar')

const adminController= require('../controllers/AdminController');

routes.get('/',adminController.index);
routes.post('/insertdata',imageUpload,adminController.insertData);
routes.get('/view',adminController.viewdata);
routes.get('/deleteData/:deleteid',adminController.deletedata);
routes.get('/editData/:editid',adminController.editdata);
routes.post('/updateData',imageUpload,adminController.updatedata)


module.exports = routes;