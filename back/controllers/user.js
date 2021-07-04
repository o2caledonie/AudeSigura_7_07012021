const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('../models');

exports.signup = (req, res, next) => {

    // Check the user inputs
    let email = req.body.email;
    let userName = req.body.userName;
    let password = req.body.password;

    if (email === null || userName === null || password === null) {
        res.status(400).json({ error: 'Veuillez renseigner tous les champs' })
    }

    // Checks if the password is 8 characters long and contains a lowercase, an uppercase, a number and a special character
    if (!/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(req.body.password)) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir minimum 8 cara, avec au minimum une lettre minuscule et une lettre majuscule, un chiffre et un caractère spécial !@#$%^&*' })
    };

    // Checks if the username contains minimum 3 and maximum 25 characters
    if (userName.length < 3) {
        return res.status(400).json({ error: 'Le nom d\'utilisateur doit contenir au minimum 3 caractères' });
    } else if (userName.length > 25) {
        return res.status(400).json({ error: 'Le nom d\'utilisateur doit contenir au maximum 25 caractères' });
    };

    // Checks if the format email is valid
    if (!/^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(req.body.email)) {
        return res.status(400).json({ error: '<format de l\'email invalide' })
    };

    db.User.findOne({
        attributes: ['userName' || 'email'],
        where: {
            userName,
            email,
        }
    })
        .then(user => {
            // Checks if the searched user exists
            if (!user) {
                // Hash the user's password
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        // Create a new User and save it to the database
                        db.User.create({
                            email: req.body.email,
                            userName: req.body.userName,
                            password: hash,
                            isAdmin: 0
                        })
                            .then(user => {
                                res.status(201).json({
                                    token: jwt.sign(
                                        {
                                            userId: user.id,
                                        },
                                        process.env.JWT_SECRET_TOKEN,
                                        { expiresIn: '24h' }
                                    ),
                                    message: 'Votre compte a bien été créé !'
                                })
                            })
                            .catch((error) => {
                                console.log(error)
                                res.status(400).json({ error: 'Une erreur s\'est produite, votre compte n\'a pas été créé' })
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                        res.status(501).json({ error: 'Une erreur s\'est produite' })
                    })
            } else {
                res.status(409).json({ error: 'Cet utilisateur existe déjà ' })
            }
        })

        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: 'Une erreur s\'est produite, votre compte n\'a pas été créé' })
        })
};

exports.login = (req, res, next) => {
    db.User.findOne({
        where: { email: req.body.email }
    })
        .then((user) => {
            // Checks if the searched user exists
            if (user) {
                // Compare the password of the recovered user with the password entered in the login form
                bcrypt.compare(req.body.password, user.password)
                    .then((isValid) => {
                        if (!isValid) {
                            return res.status(401).json({ error: 'Mot de passe incorrect !' })
                        }
                        res.status(200).json({
                            message: 'Vous êtes bien connecté !',
                            userId: user.id,
                            userName: user.userName,
                            avatar: user.avatar,
                            isAdmin: user.isAdmin,
                            token: jwt.sign(
                                {
                                    userId: user.id,
                                },
                                process.env.JWT_SECRET_TOKEN,
                                { expiresIn: '24h' }
                            )
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                        res.status(400).json({ error: 'Une erreur est survenue' })
                    })
            } else {
                return res.status(404).json({ error: 'Cet utilisateur n\'existe pas, veuillez créer un compte' })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({ error: 'Une erreur s\est produite' })
        })
};

exports.getUserProfile = (req, res, next) => {
    const id = req.params.id;
    db.User.findOne({
        attributes: ['id', 'userName', 'email', 'isAdmin', 'avatar'],
        where: { id: id }
    })
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Utilisateur non trouvé' })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: 'Une erreur s\'est produite !' })
        });
}

exports.updateProfile = (req, res, next) => {
    console.log(req.user);//Connected User
    const id = req.params.id;
    console.log(req.user.id)
    console.log(req.user.isAdmin)
    //Check if the connected user is admin or if its id matches the one in the request
    if (req.user.id != id && req.user.isAdmin === false) {
        return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à effectuer cette action' })
    }

    const userObject = req.file ?
        {
            ...req.body.userId,
            userName: req.body.userName,
            avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        } : { ...req.body }

    db.User.findOne({
        where: { id: id },
    })
        .then((user) => {
            if (user) {
                db.User.update({ ...userObject, id: id }, { where: { id: id } })
                    .then(() => res.status(200).json({ ...userObject, message: 'Votre profil a bien été modifié !' }))
                    .catch((error) => res.status(400).json({ error: 'Une erreur s\'est produite !' }))
            }
            else {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: 'Une erreur s\'est produite !' })
        });
}


exports.deleteAccount = (req, res, next) => {
    const id = req.params.id;
    if (req.user.id != id && req.user.isAdmin === false) {
        return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à effectuer cette action' })
    }
    db.User.findOne({
        attributes: ['id'],
        where: { id: id }
    })
        .then((user) => {
            if (user) {
                db.User.destroy({
                    where: { id: id }
                })
                    .then(() => res.status(200).json({ message: 'Votre compte a été supprimé' }))
                    .catch((error) => {
                        console.log(error)
                        res.status(500).json({ error: 'Une erreur s\'est produite !' })
                    });

            } else {
                return res.status(404).json({ error: 'Utilisateur non trouvé' })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: 'Une erreur s\'est produite !' })
        });
}