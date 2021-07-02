//Import express + create router
const express = require('express'),
    router = express.Router();

//Middlewares
const auth = require('../middlewares/auth');

//Import controllers
const commentCtrl = require('../controllers/comment');

//Routes
router.post('/:postId', auth, commentCtrl.createComment);
router.get('/:postId', auth, commentCtrl.getAllComments);
router.delete('/:commentId', auth, commentCtrl.deleteComment);
router.patch('/:commentId', auth, commentCtrl.updateComment);

//Export router
module.exports = router;