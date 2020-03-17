function User ( app, http, validator, usersModel, response, authenticateRequest ) {
    this.app = app;
    this.http = http;
    this.validator = validator;
    this.usersModel = usersModel;
    this.authenticateRequest  = authenticateRequest;
    this.response = response;
}

User.prototype.UserContent = ( app, http, validator, usersModel, response, authenticateRequest ) => {
    
    /**
    * @api {POST} /signup
    * @apiName Sign Up User
    * @apiGroup User Sign Up
    * 
    * @apiHeaderExample {json} Header-Example:
    * {
    *    Content-Type:application/x-www-form-urlencoded
    *    Authorization:Bearer f8c7aaf6454e9a05e1e22a0457f36b846dd6f825
    *  }
    *
    * @apiParam {String} firstname       Firstname of the user.
    * @apiParam {String} lastname        Lastname of the user.
    * @apiParam {String} email           Email of the user.
    * @apiParam {String} password        password of the user.
    * @apiParam {String} confirmpassword confirmpassword of the user.
    * @apiParam {String} username        username of the user.
    *
    *  @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *      {
    *       "status": 200,
    *        "content": {
    *                "_id": "5e70576336cbf23e34a92ed4",
    *                "firstname": "Ahmed",
    *                "lastname": "Saboor1",
    *                "email": "ahmedsaboorkhannu+2@gmail.com",
    *                "password": "03082834021",
    *                "confirmpassword": "03082834021",
    *                "username": "ahmedsaboor",
    *                "createdAt": "2020-03-17T04:51:47.052Z",
    *                "updatedAt": "2020-03-17T04:51:47.052Z",
    *                "__v": 0
    *            },
    *            "message": "User Register Sucessfully."
    *        }  
    *
    * @apiError UserNotFound The id of the User was not found.
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 400 BAD REQUEST
    *     {
    *       "status": 400,
    *       "content": "",
    *        "message": "Something Missing Try Again Thank you"
    *     }
    */

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

    /**
    * @api {POST} /signin
    * @apiName Sign In User
    * @apiGroup User Sign In
    * 
    * @apiHeaderExample {json} Header-Example:
    * {
    *    Content-Type:application/x-www-form-urlencoded
    *    Authorization:Bearer f8c7aaf6454e9a05e1e22a0457f36b846dd6f825
    *  }
    *
    * @apiParam {String} password        password of the user.
    * @apiParam {String} username        username of the user.
    *
    *  @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *   {
    *        "status": 200,
    *        "content": {
    *            "_id": "5e6e83a50c41d73708397221",
    *            "firstname": "Ahmed",
    *            "lastname": "Saboor",
    *            "username": "Saboor1993",
    *            "password": "1",
    *            "email": "ahmedsaboorkhannu@gmail.com",
    *            "confirmpassword": "1",
    *            "createdAt": "2020-03-15T19:36:05.274Z",
    *            "updatedAt": "2020-03-15T19:36:05.274Z",
    *            "__v": 0
    *        },
    *        "message": "User Register Sucessfully."
    *    }  
    *
    * @apiError UserNotFound The id of the User was not found.
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 400 BAD REQUEST
    *     {
    *       "status": 400,
    *       "content": "",
    *        "message": "Something Missing Try Again Thank you"
    *     }
    */

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