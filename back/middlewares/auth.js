const jwt = require('jsonwebtoken'); //Package jsonwebtoken to verify if user's Token matches user's ID from request to allow changes
const db = require('../models');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            //permet de récupérer l'utilisateur connecté pour le mettre dans la requête
            req.user = await db.User.findOne({
                attributes : ['id','isAdmin'],
                where: {
                    id: userId
                }
            });
            if (req.user === null){
                return res.status(401).json({
                    error: 'Utilisateur non authentifié'
                })
            }
            console.log(req.user); 
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({
            error: 'Invalid request!'
        });
    }
};
