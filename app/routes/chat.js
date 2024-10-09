const express = require("express");
const router = express.Router();
const Chat = require("../models/chat"); 
var path = require('path');
var controllerDir = "../controllers/";
var userController = require(controllerDir+"user");

module.exports = (io) => {
    router.get("/view/:id", userController.isAuth, async (req, res, next) => {
        const numSala = req.params.id;
        setTimeout(() => {
            res.redirect(`/chat/sala/${numSala}`);
        }, 100);
    });
    
    router.get("/sala/:sala", userController.isAuth, async (req, res, next) => {
        const numSala = req.params.sala;
        const username = req.session.auth.info.name;
        const avatar = req.session.auth.info.avatar;
        res.render(`chat/sala/sala`, { sala: numSala, username: username, avatar: avatar });
    });

    router.get("/sala/:sala/historial", userController.isAuth, async (req, res, next) => {
        const numSala = req.params.sala;
        const username = req.session.auth.info.name;
        const avatar = req.session.auth.info.avatar;
        res.render(`chat/sala/historial`, { sala: numSala, username: username, avatar: avatar });
    });
    return router;
};
