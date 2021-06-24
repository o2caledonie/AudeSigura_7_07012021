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
// router.put('/:id', auth, commentCtrl.updateComment);
// router.delete('/:id', auth, commentCtrl.deleteComment);

//Export router
module.exports = router;