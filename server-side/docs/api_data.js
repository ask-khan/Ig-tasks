define({ "api": [
  {
    "type": "POST",
    "url": "/signin",
    "title": "",
    "name": "Sign_In_User",
    "group": "User_Sign_In",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   Content-Type:application/x-www-form-urlencoded\n   Authorization:Bearer f8c7aaf6454e9a05e1e22a0457f36b846dd6f825\n }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n     \"status\": 200,\n     \"content\": {\n         \"_id\": \"5e6e83a50c41d73708397221\",\n         \"firstname\": \"Ahmed\",\n         \"lastname\": \"Saboor\",\n         \"username\": \"Saboor1993\",\n         \"password\": \"1\",\n         \"email\": \"ahmedsaboorkhannu@gmail.com\",\n         \"confirmpassword\": \"1\",\n         \"createdAt\": \"2020-03-15T19:36:05.274Z\",\n         \"updatedAt\": \"2020-03-15T19:36:05.274Z\",\n         \"__v\": 0\n     },\n     \"message\": \"User Register Sucessfully.\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"status\": 400,\n  \"content\": \"\",\n   \"message\": \"Something Missing Try Again Thank you\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/actions/user.js",
    "groupTitle": "User_Sign_In"
  },
  {
    "type": "POST",
    "url": "/signup",
    "title": "",
    "name": "Sign_Up_User",
    "group": "User_Sign_Up",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   Content-Type:application/x-www-form-urlencoded\n   Authorization:Bearer f8c7aaf6454e9a05e1e22a0457f36b846dd6f825\n }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmpassword",
            "description": "<p>confirmpassword of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n  \"status\": 200,\n   \"content\": {\n           \"_id\": \"5e70576336cbf23e34a92ed4\",\n           \"firstname\": \"Ahmed\",\n           \"lastname\": \"Saboor1\",\n           \"email\": \"ahmedsaboorkhannu+2@gmail.com\",\n           \"password\": \"03082834021\",\n           \"confirmpassword\": \"03082834021\",\n           \"username\": \"ahmedsaboor\",\n           \"createdAt\": \"2020-03-17T04:51:47.052Z\",\n           \"updatedAt\": \"2020-03-17T04:51:47.052Z\",\n           \"__v\": 0\n       },\n       \"message\": \"User Register Sucessfully.\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"status\": 400,\n  \"content\": \"\",\n   \"message\": \"Something Missing Try Again Thank you\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/actions/user.js",
    "groupTitle": "User_Sign_Up"
  }
] });
