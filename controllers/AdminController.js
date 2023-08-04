const Admintbl = require('../models/AdminModel');


const path = require('path');
const fs = require('fs');
const uploads = path.join('uploads')

const index = (req,res) => {
    return res.render('index');
}

const insertData = async(req,res)=>{
    let avatar = "";

    if(req.file){
        avatar = uploads+ '/' + req.file.filename;
    }
    try{ 

        let admin = await Admintbl.create({
            grid : req.body.grid,
            name : req.body.namee,
            email : req.body.email,
            password : req.body.password,
            phone : req.body.phone,
            course : req.body.course,
            fees : req.body.fees,
            avatar : avatar
        })

        if(admin){
            console.log("record successfully insert");
            req.flash('success','Record inserted');
            return res.redirect('back');
        }
        else{
            console.log("record not insert");
            return false;
        }
    }
    catch(err){
        console.log(err);
        return false;
    } 
}

const viewdata = async(req,res)=>{

    try{

        let view = await Admintbl.find({})

        if(view){
            return res.render('viewdata',{
                alldata : view
            })
        }
        else{
            console.log("record not fetch");
            return false;
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const deletedata = async(req,res) => {

    let id = req.params.deleteid;

    try{

        let deldata = await Admintbl.findByIdAndDelete(id);

        if(deldata){
            return res.redirect('back');
        }
        else{
            console.log("record not deleted");
            return false; 
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const editdata = async(req,res) => {
    let id = req.params.editid;

    try{

        let edit = await Admintbl.findById(id);

        if(edit){
            return res.render('edit',{
                single : edit
            })
        }
        else{
            console.log("record not fetch");
            return false;  
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const updatedata = async(req,res) => {

    let id = req.body.editid; 

    try{

        if(req.file){

            let upimg = await Admintbl.findById(id)

            if(upimg.avatar){
                fs.unlinkSync(upimg.avatar);
                let avatar = uploads+'/'+ req.file.filename;

                let update = await Admintbl.findByIdAndUpdate(id,{
                    grid : req.body.grid,
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    phone : req.body.phone,
                    course : req.body.course,
                    fees : req.body.fees,
                    avatar : avatar
                })
        
                if(update){
                    console.log("record are fetch");
                    return res.redirect('/view');
                }
                else{
                    console.log("record not fetch");
                    return false;
                }
            }
            else{
                console.log('Can not Update img');
                return false;
            }
        }
        else{
            let upimg = await Admintbl.findById(id);

            if(upimg.avatar){
                let avatar = upimg.avatar;
                
                let update = await Admintbl.findByIdAndUpdate(id,{
                    grid : req.body.grid,
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    phone : req.body.phone,
                    course : req.body.course,
                    fees : req.body.fees,
                    avatar : avatar,
                })
                if(update){
                    console.log("record are fetch");
                    return res.redirect('/view');
                }
                else{
                    console.log("record not fetch");
                    return false;
                }
            }
            else{
                console.log('Can not Update img');
                return false;
            }
        }

    }
    catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {index,insertData,viewdata,deletedata,editdata,updatedata};