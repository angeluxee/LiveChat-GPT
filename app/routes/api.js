const express = require("express");
const router = express.Router();
var path = require('path');
var controllerDir = "../controllers/";
var apiController = require(controllerDir+"api");
var chatController = require(controllerDir+"chat");

router.post("/add", apiController.addApiKey);

router.get("/msg/:room", apiController.apiCheck, chatController.getMessages);

router.get("/msg/:room/:user", apiController.apiCheck, chatController.getMessages);

router.get("/usermsg/:user", apiController.apiCheck, chatController.getMessages);



module.exports = router;
