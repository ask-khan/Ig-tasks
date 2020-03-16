var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app/server");
let should = chai.should();
chai.use(chaiHttp);

describe("Books", function(){
    describe ("DELETE ALL", function(){
        it("Sign Up with Empty Response", done=>{
            chai.request(server)
                .post("/signup")
                .send({
                })
                .end((err,res)=>{
                    res.should.have.status(400);
                    done();
                })
        })

        it("Sign Up with Proper Response", done=>{
            chai.request(server)
                .post("/signup")
                .send({
                    "firstname":"Ahmed",
                    "lastname":"Saboor",
                    "email":"ahmedsaboorkhannu@gmail.com",
                    "password":"03082834021",
                     "confirmpassword":"03082834021",
                    "username":"ahmedsaboor",
                })
                .end((err,res)=>{
                    res.should.have.status(200);
                    done();
                })
        })

    })
    /// some other tests we will write here
})