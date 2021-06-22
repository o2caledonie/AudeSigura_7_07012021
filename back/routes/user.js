// const express = require('express'),
//     router = express.Router();

// router.post('/signup', (req, res) => {
//     res.json({ "msg": "Signup Route" })
// });
// router.post('/signin', (req, res) => {
//     res.json({ "msg": "Signin Route" })
// });

// module.exports = router

// const express = require('express'),
//     router = express.Router(),
//     User = require("../controllers/auth")
// router.post('/signup', User.signUp);
// router.post('/signin', User.signIn);
// // router.get('/users', auth.validateToken, User.getUsers);
// module.exports = router

const express = require('express'),
    router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.get('/:id', auth, userCtrl.getUserProfile);
router.put('/:id', auth, multer, userCtrl.updateProfile);
router.delete('/:id', auth, userCtrl.deleteAccount);

module.exports = router