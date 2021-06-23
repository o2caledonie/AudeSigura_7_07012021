//Import express + create router
const express = require('express'),
    router = express.Router();

//Middlewares
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

//Import controllers
const userCtrl = require("../controllers/user");

//Routes
router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.get('/:id', auth, userCtrl.getUserProfile);
router.put('/:id', auth, multer, userCtrl.updateProfile);
router.delete('/:id', auth, userCtrl.deleteAccount);

//Export router
module.exports = router