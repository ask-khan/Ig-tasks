const express = require("express");
const bodyParse = require("body-parser");
const logger = require('winston');
const config = require('../config.js');
const response = require( '../response.js' );
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const validator = require('validator');
const cors = require('cors');


const oauthServer = require('oauth2-server');
const https = require('http');

Request = oauthServer.Request,
	Response = oauthServer.Response;

const http = require('./../http');

// Include Models
const usersModel = require('../app/models/user.model');
const itemsModel = require('../app/models/item.model.js');

// Include Actions.
const user = require('../app/actions/user.js');
const item = require('../app/actions/item.js');

// Include oauth.
require('../app/actions/oauth.js');

Request = oauthServer.Request,
Response = oauthServer.Response;

const app = express();

app.use( cors() );

// Connecting to the database
mongoose.connect(config.dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
	console.log("Successfully connected to the database");
}).catch(err => {
	console.log('Could not connect to the database. Exiting now...', err);
	process.exit();
});

// Use Cookie Parser.
app.use(cookieParser());
// Use Sessions.
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.oauth = new oauthServer({
	model: require('./actions/oauth.js'),
	grants: ['password'],
	debug: true
});

app.all('/oauth/token', obtainToken);

app.listen(config.mode.PORT, () => console.log("listening on port " + config.mode.PORT + "!"));

function obtainToken(req, res) {
	var request = new Request(req);
	var response = new Response(res);
	return app.oauth.token(request, response).then(function (token) {
		res.json(token);
	}).catch(function (err) {
		res.status(err.code || 500).json(err);
	});
}

var authenticateRequest = function (req, res, next) {

	var request = new Request(req);
	var response = new Response(res);

	return app.oauth.authenticate(request, response).then(function (token) {
		next();
	}).catch(function (err) {
		res.status(err.code || 500).json(err);
	});
}

var userActions = new user(app, http, validator, usersModel, response, authenticateRequest);
userActions.UserContent(app, http, validator, usersModel, response, authenticateRequest);

var itemActions = new item(app, http, validator, usersModel, itemsModel, response, authenticateRequest);
itemActions.ItemContent(app, http, validator, usersModel, itemsModel, response, authenticateRequest);

app.all('*', (req, res) => {
	res.status(404).send({ msg: 'not found' });
});

var server = https.createServer(app);

module.exports = app;

