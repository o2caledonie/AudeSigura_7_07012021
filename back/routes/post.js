//Import express + create router
const express = require('express'),
    router = express.Router();

//Middlewares
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

//Import controllers
const postCtrl = require('../controllers/post');

//Routes
router.post('', auth, multer, postCtrl.createPost);
router.get('', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

//Export router
module.exports = router;