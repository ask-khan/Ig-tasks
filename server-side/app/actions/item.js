function Item ( app, http, validator, usersModel, itemsModel, response, authenticateRequest ) {
    this.app = app;
    this.http = http;
    this.validator = validator;
    this.usersModel = usersModel;
    this.itemsModel = itemsModel;
    this.response = response;
    this.authenticateRequest  = authenticateRequest;
}

Item.prototype.ItemContent = ( app, http, validator, usersModel, itemsModel, response, authenticateRequest ) => { 
  
    app.post('/item', authenticateRequest, async () => {
        const items = await itemsModel.find({});
        try {
            res.send(items);
        } catch (err) {
            res.status(500).send(err);
        }
    });




    app.post('/createitem', authenticateRequest, async ( req, res ) => {
        if (  validator.isEmpty( req.body.userId ) == false && validator.isEmpty( req.body.itemText ) == false ) {
            req.body.mark = false;
            var item = new itemsModel( req.body );
            try {
                await item.save();
                res.status( http.OK ).send( item );
            } catch ( err ) {
                res.status( http.INTERNALERROR ).send( err );
            }
        }

    });

    app.post('/markitem', authenticateRequest, async ( req, res ) => {
        if (  validator.isEmpty( req.body.userId ) == false && validator.isEmpty( req.body.itemText ) == false ) {
            req.body.mark = !req.body.mark;
            
            try {
                await itemsModel.findByIdAndUpdate( req.body.id, req.body  );
                await itemsModel.save()
                res.status( http.OK ).send( item );
            } catch ( err ) {
                res.status( http.INTERNALERROR ).send( err );
            }
        }
    });


    app.get('/deleteitem/:id', authenticateRequest, async ( req, res ) => {
        if (  validator.isEmpty( req.params.id ) == false ) {
            
            try {
                await itemsModel.findByIdAndRemove( req.params.id );
                await itemsModel.save();
                res.status( http.OK ).send( item );
            } catch ( err ) {
                res.status( http.INTERNALERROR ).send( err );
            }
        }
    });

    
};

module.exports = Item;