// const express = require('express'),
//     router = express.Router();

// router.post('/signup', (req, res) => {
//     res.json({ "msg": "Signup Route" })
// });
// router.post('/signin', (req, res) => {
//     res.json({ "msg": "Signin Route" })
// });

// module.exports = router

const express = require('express'),
    router = express.Router(),
    User = require("../controllers/auth")
router.post('/signup', User.signUp);
router.post('/signin', User.signIn);
// router.get('/users', auth.validateToken, User.getUsers);
module.exports = router