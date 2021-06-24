const jwt = require("jsonwebtoken");
const db = require('../models');

exports.createComment = async (req, res, next) => {
    const post = await db.Post.findOne({
        where: { id: req.params.postId },
    });

    const content = req.body.content;
    if (content === null || content == '') {
        return res.status(400).json({ error: 'Ce champ doit être renseigné'});
    } else {
        try {
            await db.Comment.create({
                content: req.body.content,
                ownerId: req.user.id,
                postId: req.params.postId
            });
            return res.status(200).json({ message: 'Votre commentaire a bien été créé'})
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Une erreur est survenue, votre commentaire n\'a pas été créé' })
        }
    }
}

// exports.createComment = (req, res, next) => {

//     if (req.body.content === null || req.body.content == '') {
//         return res.status(400).json({ error: 'Ce champ doit être renseigné'});
//     } 
//     db.Post.findOne({
//         where: { id: req.params.postId },
//     })
//     .then(post => {
//         if(post) {
//             const comment = db.Comment.build({
//                 content: req.body.content,
//                 postId: req.params.postId,
//                 ownerId: req.user.id
//             })
//             comment.save()
//             .then(() => res.status(201).json({ message: 'Votre commentaire a bien été créé'}))
//             .catch((error) => {
//                 console.log(error)
//                 res.status(400).json({ error: 'Une erreur est survenue'});
//             })
//         } else {
//             return res.status(404).json({ error : 'Post non trouvé'})
//         }
//     })
//     .catch((error) => {
//         console.log(error)
//         res.status(400).json({ error: 'Une erreur est survenue'});
//     })
// }

exports.getAllComments = async (req, res, next) => {
    const comments = await db.Comment.findAll({
        include: [{
            model: db.User,
            as: 'owner',
            attributes: ['id', 'userName']
        },{
            model: db.Post,
            as:  'post',
            attributes: ['id']
        }],
    });
    return res.status(200).json(comments)
}