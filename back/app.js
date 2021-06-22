const express = require('express');
const app = express();
const db = require('./models');
const bodyParser = require('body-parser');
const helmet = require('helmet');
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

// Sequelize tries to connect to the database
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully');
    })
    .catch(error => {
        console.log('Unable to connect to the database : ', error);
    })

// ROUTES
app.use('/images', express.static(path.join(__dirname, 'images')));//Download images from 'images' directory 

// app.use('/api', require('./routes/auth'));
// const authRoutes = require("./routes/auth");
// app.use('/api/auth', authRoutes);
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

module.exports = app;