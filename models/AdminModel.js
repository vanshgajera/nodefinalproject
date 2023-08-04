const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    grid : {
        type : String,
        require : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    course : {
        type : Array,
        required : true
    },
    fees : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    }
})

const Adminpanel = mongoose.model('admin',AdminSchema);
module.exports = Adminpanel;