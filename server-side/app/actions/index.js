const app  = module.exports = require('express')();
const http = require('../../http.js');

const user = require('../actions/user.js');
const item = require('../actions/item.js');

app.get('/', (req, res) => {
    res.send({ msg: 'hello! Server is up and runing.' });
});

var userActions = new user( app, http );
userActions.UserContent( app, http );

var itemActions = new item( app, http );
itemActions.ItemContent( app, http );

app.all('*', ( req, res ) => {
    res.status(404).send({ msg: 'not found' });
});