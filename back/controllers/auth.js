const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('../models');

exports.signup = (req, res, next) => {

    // Checks if the password is 8 characters long and contains a lowercase, an uppercase, a number and a special character
    if (!/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(req.body.password)) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir minimum 8 caractères avec au minimum un caractère minuscule et majuscule, un chiffre et un caractère spécial !@#$%^&*' })
    };
    db.User.findOne({
        where: { email: req.body.email }
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
                            .catch(error => res.status(400).json({ error: 'Une erreur s\'est produite, votre compte n\'a pas été créé' }))
                    })
                    .catch(error => res.status(501).json({ error: 'Une erreur s\'est produite' }))
            } else {
                res.status(409).json({ error: 'Cet utilisateur existe déjà ' })
            }
        })

        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    db.User.findOne({
        where: { email: req.body.email }
    })
        .then(user => {
            // Checks if the searched user exists
            if (user) {
                // Compare the password of the recovered user with the password entered in the login form
                bcrypt.compare(req.body.password, user.password)
                    .then(isValid => {
                        if (!isValid) {
                            return res.status(401).json({ error: 'Mot de passe inccorrect !' })
                        }
                        res.status(200).json({
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
                    .catch(error => res.status(400).json({ error : 'Une erreur est survenue'}))
            } else {
                return res.status(404).json({ error: 'Cet utilisateur n\'existe pas, veuillez créer un compte' })
            }
        })               
        .catch (error => res.status(400).json({ error: 'Une erreur s\est produite' }))
};
