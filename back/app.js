const express = require('express'); //Import "express" (framework based on Node.js)
const app = express();
const db = require('./models');
const bodyParser = require('body-parser');//Extracts JSON object from POST requests
const helmet = require('helmet'); //Node.js module that helps in securing HTTP headers
const path = require('path'); //Plugin to upload images and manage files paths access

require('dotenv').config();

// HEADERS CONFIG
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*'); //API access from all origins
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //Add headers mentionned in requests sent to API
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //Authorized methods for HTTP requests
   next();
});

// BODYPARSER
app.use(bodyParser.json());// Parse incoming request bodies in json format

// HELMET
app.use(helmet()); //sets up various HTTP headers to prevent attacks like Cross-Site-Scripting(XSS), clickjacking, etc.

// Sequelize to connect to the database
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully');
    })
    .catch(error => {
        console.log('Unable to connect to the database : ', error);
    })

// IMAGES PATH
app.use('/images', express.static(path.join(__dirname, 'images')));//Download images from 'images' directory 

// ROUTES
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const postRoutes = require('./routes/post');
app.use('/api/post', postRoutes);

const commentRoutes = require('./routes/comment');
app.use('/api/comment', commentRoutes);

module.exports = app;