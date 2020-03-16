const mongoose = require('mongoose');

const itemContent = mongoose.Schema({
        userId: { type: String, required: true }, 
        itemText: { type: String, required: true },
        mark: { type: Boolean, required: true }
    }, 
    {
    timestamps: true
});

const Item = mongoose.model( "Items" , itemContent );
module.exports = Item;