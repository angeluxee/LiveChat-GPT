//const express = require('express');
//const session = require('express-session');
var UserModel = require("../models/user");
exports.login = async (req, res, next) => {
    try {
        req.user = await UserModel.findOne({ username: req.body.username, password: req.body.password });        
        req.user ? next() : res.redirect("/");

    } catch (error) {
        console.error(`Error getting User ${error}`);
    }
};

exports.putSession = async (req, res, next) => {
    try {
        req.session.auth ={
            isAuth:true, 
            info: {name: req.user.username, avatar: req.user.avatar, id: req.user._id}
        }
        
        next();
    } catch (error) {
        console.error(`Error Session" ${error}`);
    }
};

exports.isAuth = async (req, res, next) => {
    try {
        if(!req.session.auth) {
            res.redirect("/");
        }
        next();
    } catch (error) {
        console.error(`Error isAuth" ${error}`);
    }
};
exports.create = async (req, res, next) => {
    try {
        if(req.user){
            next();
        }else{
            var User = new UserModel({username: req.body.username, password:req.body.password, rol:req.body.rol});
            User.save();
            next();
        }
    } catch (error) {
        console.error(`Error create" ${error}`);
    }
};


//EXTRA PROFILE

exports.editProfile = async (req, res, next) => {
    try {
        if(await UserModel.findOne({username: req.body.username}) && req.session.auth.info.name != req.body.username){
            res.redirect("/profile");
        }else{
            var user = await UserModel.findOne({_id: req.session.auth.info.id});
            console.log(user.username, req.body.username)
            user.username = req.body.username;
            if(req.file){
                user.avatar = req.file.originalname;
            }
            await user.save();
            req.session.auth.info.avatar = user.avatar;
            req.session.auth.info.name = user.username;
    
            res.redirect("/profile");
        }


    } catch (error) {
        console.error(`Error create" ${error}`);
    }
};