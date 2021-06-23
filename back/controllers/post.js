const jwt = require("jsonwebtoken");
const db = require('../models');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    console.log(req.user);//Connected User
    const id = req.params.id;
    console.log(req.user.id)
    //Check if the connected user is admin or if its id matches the one is the request
    if (req.user.id != id) {
        return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à effectuer cette action' })
    }
    // Content field must be completed
    if (content == null || content == '') {
        return res.status(400).json({ error: 'Ce champ doit être renseigné' });
    }

    db.User.findOne({
        where: { id: id }
    })

        .then(user=> {
            if (user) {
                const post = db.Post.build({
                    content: req.body.content,
                    image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.image,
                    ownerId: user.id
                })
                post.save()
                    .then(() => res.status(201).json({ message: 'Votre message a bien été créé !' }))
                    .catch(error => res.status(400).json({ error: 'Une erreur s\'est produite !' }));
            } else {
                return res.status(404).json({ error: 'Utilisateur non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
};

exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        order: [['createdAt', "DESC"]] ,
        include: {
            model: db.User,
            attributes: [ 'userName', 'avatar' ]
        }
    })
    .then(posts=> {
        if(posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ error: 'Aucun message trouvé' });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ error: 'Une erreur s\'est produite !' });
    });
}