const express = require("express");
const bodyParse = require("body-parser");
const logger = require('winston');
const config = require('../config.js');
const mongoose = require('mongoose');

function run() {
    const app = express();  
    mongoose.connect( config.dbConfig.url, { useNewUrlParser: true } );
    app.use( bodyParse.urlencoded({ extended: true }) );
    app.use( bodyParse.json() );
    
    app.use(require('../app/actions/index'));
    app.listen(config.mode.PORT, () => console.log("listening on port " + config.mode.PORT + "!"));

}

module.exports = run;

if ( require.main === module ) {
    run();
}