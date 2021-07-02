const jwt = require("jsonwebtoken");
const db = require('../models');

exports.createComment = async (req, res, next) => {
    const post = await db.Post.findOne({
        where: { id: req.params.postId },
    });

    const content = req.body.content;
    if (content === null || content == '') {
        return res.status(400).json({ error: 'Ce champ doit être renseigné' });
    } else {
        try {
            await db.Comment.create({
                content: req.body.content,
                ownerId: req.user.id,
                postId: req.params.postId
            });
            return res.status(200).json({ message: 'Votre commentaire a bien été créé' })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Une erreur est survenue, votre commentaire n\'a pas été créé' })
        }
    }
}

exports.getAllComments = async (req, res, next) => {
    const comments = await db.Comment.findAll({
        order: [['updatedAt', "ASC"], ['createdAt', "ASC"]],
        where: { postId: req.params.postId },
        include: [{
            model: db.User,
            as: 'owner',
            attributes: ['id', 'userName', 'avatar']
        }, {
            model: db.Post,
            as: 'post',
            attributes: ['id']
        }],
    });
    return res.status(200).json(comments)
}

exports.deleteComment = async (req, res, next) => {
    const comment = await db.Comment.findOne({
        where: { id: req.params.commentId },
    });
    if (comment === null) {
        return res.status(404).json({ error: "Commentaire non trouvé" })
    } else {
        if (req.user.id != comment.ownerId && req.user.isAdmin != true) {
            return res.status(403).json({ error: 'Vous n\'êtes pas autorisé(e) à effectuer cette action' })
        }
        try {
            await db.Comment.destroy({
                where: { id: req.params.commentId }
            });
            return res.status(200).json({ message: 'Votre commentaire a bien été supprimé'})
        } catch (error) {
            return res.status(500).json({ error: 'Une erreur s\'est produite ! Votre commentaire n\'a pas été supprimé ...' });
        }
    }
}

exports.updateComment = async (req, res, next) => {
    // const contentComment = req.body.content;
    console.log(req.body.content);
    const contentComment = req.body.content
    const comment = await db.Comment.findOne({
        where: { id: req.params.commentId },
    });
    if (comment === null) {
        return res.status(404).json({ error: "Commentaire non trouvé" })
    } else {
        if (req.user.id != comment.ownerId && req.user.isAdmin != true) {
            return res.status(403).json({ error: 'Vous n\'êtes pas autorisé(e) à effectuer cette action' })
        }
        try {
            await db.Comment.update({content: contentComment},{
                where: { id: req.params.commentId }
            });
            return res.status(200).json({ message: 'Votre commentaire a bien été modifié'})
        } catch (error) {
            return res.status(500).json({ error: 'Une erreur s\'est produite ! Votre commentaire n\'a pas été modifié ...' });
        }
    }
}