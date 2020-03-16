const mongoose = require('mongoose');

const userContent = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true }
    }, 
    {
    timestamps: true
});

const User = mongoose.model( "Users" , userContent );
module.exports = User;