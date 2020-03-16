# Ig-tasks

## Client Side 
** Go Into Client Side Folder **

```
npm install 
ng serve --o
```

## Sever Side 
** Go Into Sever Side Folder **

```
npm install 
```

*** Go Into Sever Side Folder And Move To App folder ***

```
nodemon server.js
```

## For Sever Side Test Case  
** Go Into test Folder **
```
mocha test/user.js
```

Kindly Create clients documents In database:
And Insert these values

{"_id":{"$oid":"5e67e89774f0613b84309149"},
"grants":["password","refresh_token"],
"redirectUris":[],
"id":"application",
"clientId":"application",
"clientSecret":"secret",
"__v":{"$numberInt":"0"}}


{"_id":{"$oid":"5e67e89774f0613b8430914a"},
"grants":["password","client_credentials"],
"redirectUris":[],
"clientId":"confidentialApplication",
"clientSecret":"topSecret",
"__v":{"$numberInt":"0"}}

In case you find any problem follow this link:-
https://github.com/pedroetb/node-oauth2-server-example


