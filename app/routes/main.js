var express = require("express");
var path = require("path");
var router = express.Router();
var controllerDir = "../controllers/";
var userController = require(controllerDir+"user");
var uploadController = require(controllerDir+"upload");

router.get("/", (req, res, next) => {
    res.render("login-page");
});

router.get('/info', (req, res, ) => {
    res.render("info");
});


router.get('/admin/user/create', (req, res, ) => {
    res.render("create");
});

router.post('/createuser', userController.create, (req, res, next) => {
    res.redirect("/");
});

/*Access only if logged in with session */
router.get("/chat/list", (req, res, next) => {
    if(req.session.auth){
        res.render("chatlist");
    }
});
router.get("/admin/info", (req, res, next) => {
    res.render("admin/info");
});
router.post("/login",userController.login,userController.putSession,userController.isAuth, (req, res, next) => {
    // if isAuth
    if(req.session.auth.isAuth){
        res.redirect("chat/list");
    }
});



//EXTRA PERFIL
router.get("/profile", userController.isAuth, (req, res, next) => {
    res.render("profile", {username: req.session.auth.info.name, avatar: req.session.auth.info.avatar});
});

router.post("/profile/edit", uploadController.upload.single("avatar"), userController.editProfile);

module.exports = router;
