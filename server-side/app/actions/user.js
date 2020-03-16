function User ( app, http, validator, usersModel, response, authenticateRequest ) {
    this.app = app;
    this.http = http;
    this.validator = validator;
    this.usersModel = usersModel;
    this.authenticateRequest  = authenticateRequest;
    this.response = response;
}

User.prototype.UserContent = ( app, http, validator, usersModel, response, authenticateRequest ) => {
    
    app.post('/signup', async ( req, res ) => {
        
        if (  req.body.firstname != undefined && req.body.lastname != undefined && validator.isEmpty( req.body.firstname  ) == false && validator.isEmpty( req.body.lastname  ) == false && req.body.password === req.body.confirmpassword && validator.isEmail( req.body.email ) == true  ) {
            const emailExist = await usersModel.find({ 'email': req.body.email });
            const user = new usersModel( req.body );
            try {
                if ( emailExist.length == 0 ) {
                    await user.save();
                    var responseContent = { 'status': http.OK, 'content': user, 'message': response.SUCCESS }
                    res.status( http.OK ).send( responseContent );
                } else {
                    var responseContent = { 'status': http.BADREQUEST, 'content':[], 'message': response.DUPLICATEEMAIL }
                    res.status( http.BADREQUEST ).send( responseContent );
                }
            } catch ( err ) {
                var responseContent = { 'status': http.INTERNALERROR, 'content': err ,'message': response.BADREQUEST }
                res.status( http.INTERNALERROR ).send( responseContent );
            }        
        } else {
            var responseContent = { 'status': http.BADREQUEST, 'content': '', 'message': response.BADREQUEST }
            res.status( http.BADREQUEST ).send( responseContent );
        }
    });

    app.post('/signin', authenticateRequest, async ( req, res ) => {
       
        if ( req.body.username != undefined && req.body.password != undefined &&  validator.isEmpty( req.body.password ) == false ) {
            const userContent = await usersModel.findOne({ 'username': req.body.username, 'password': req.body.password  });
            
            try {
                req.session.id = userContent.id;
                req.session.email = userContent.email;
                var responseContent = { 'status': http.OK, 'content': userContent, 'message': response.SUCCESS }
                res.status( http.OK ).send( responseContent );
            } catch ( err ) {
                var responseContent = { 'status': http.INTERNALERROR, 'content': err ,'message': response.BADREQUEST }
                res.status( http.INTERNALERROR ).send( responseContent );
            }        
        } else {
            var responseContent = { 'status': http.BADREQUEST, 'content': '', 'message': response.BADREQUEST }
            res.status( http.BADREQUEST ).send( responseContent );
        }
    });

    app.post('/signout', authenticateRequest, async ( req, res ) => {
        // Destory session.
        req.session.user = null;
        var responseContent = { 'status': http.OK, 'content': "Logout Sucessfully.", "message": response.LOGOUT }
        res.status( http.OK ).send( responseContent );
        
    });
};

module.exports = User;