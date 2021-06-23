const jwt = require("jsonwebtoken");
const db = require('../models');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    console.log(req.user);//Connected User
    const id = req.user.id;
    console.log(req.user.id);
    const content = req.body.content;

    // Content field must be completed
    if (content == null || content == '') {
        return res.status(400).json({ error: 'Ce champ doit être renseigné' });
    }
    const post = db.Post.build({
        content: req.body.content,
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.image,
        ownerId: id
    })
    post.save()
        .then(() => {
            res.status(201).json({ message: 'Votre message a bien été créé !' })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({ error: 'Une erreur s\'est produite !' })
        });
}

exports.updatePost = (req, res, next) => {
    const content = req.body.content;
    const postObject = req.file ?
        {
            content: req.body.content,
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ...req.body }

    db.Post.findOne({
        where: { id: req.params.id },
    })
        .then((post) => {
            console.log(req.user.id)
            console.log(post.ownerId)
            if (post) {
                if (req.user.id != post.ownerId && req.user.isAdmin === false) {
                    return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à effectuer cette action' })
                }
                db.Post.update(postObject, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Votre publication a bien été modifiée !' }))
                    .catch(error => res.status(400).json({ error: 'Une erreur s\'est produite !' }))
            }
            else {
                res.status(404).json({ error: 'Publication non trouvée' });
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: 'Une erreur s\'est produite !' })
        });
}

exports.deletePost = (req, res, next) => {
    const content = req.body.content;
    const postObject = req.file ?
        {
            content: req.body.content,
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ...req.body }

    db.Post.findOne({
        where: { id: req.params.id },
    })
        .then((post) => {
            console.log(req.user.id)
            console.log(post.ownerId)
            if (post) {
                if (req.user.id != post.ownerId && req.user.isAdmin === false) {
                    return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à effectuer cette action' })
                }
                db.Post.update(postObject, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Votre publication a bien été modifiée !' }))
                    .catch(error => res.status(400).json({ error: 'Une erreur s\'est produite !' }))
            }
            else {
                res.status(404).json({ error: 'Publication non trouvée' });
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: 'Une erreur s\'est produite !' })
        });
}

exports.getOnePost = (req, res, next) => {
    db.Post.findOne({
        where: { id: req.params.id },
        include: [{
            model: db.User,
            as: 'owner',
            attributes: ['id', 'userName', 'avatar']
        }]
    })
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ error: 'Aucun message trouvé' });
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send({ error: 'Une erreur s\'est produite !' });
        });
}

exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        order: [['createdAt', "DESC"]],
        include: [{
            model: db.User,
            as: 'owner',
            attributes: ['id', 'userName', 'avatar']
        }]
    })
        .then((posts) => {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({ error: 'Aucun message trouvé' });
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send({ error: 'Une erreur s\'est produite !' });
        });
}



