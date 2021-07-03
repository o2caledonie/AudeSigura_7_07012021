# AudeSigura_7_07012021

## Presentation ##
Groupomania is a group specializing in mass distribution. The objective of this project is the development of an internal social network for Groupomania employees so they can interact.

## Techs ##
▹ HTML
▹ CSS
▹ Bootstrap
▹ Sass
▹ JavaScript
▹ Vue.js
▹ Node.js
▹ Express.js
▹ MySQL
▹ SQL
▹ Sequelize

## Prerequisites ##

You will need to have MySQL, Node and Vue installed locally on your machine.
Install :
NodeJS: version 14.16. 
Vue CLI : version 4.5.

## Installation ##

Clone this repo. 

### From within the "back" directory: ###

1) run `npm install`
2) add the configuration of your database in the 'config/config.json' file
3) run the following commands to set up the database as well as the tables : 
`npx sequelize-cli db:create`
`npx sequelize-cli db:migrate`
4) optional : you can quickly implement a set of fake data, run the following command :
`npx sequelize-cli db:seed:all`
3) run `npm sart`. The server should listen on port 3000.


### From within the "front" directory: ###

1) run `npm install`
2) run `ng serve`. The server should run on `localhost` with default port `8080`. 
3) go to your web browser and type the following address : http://localhost:8080 


Enjoy !
