# hacktivgit

client site http://localhost:8080/

server site http://localhost:3000/

**USAGE**
```javascript
npm install //inside server folder
npm run dev //inside server folder
```

Routing | HTTP | Header(s) | Body | Responese | Description
:---: | :---: | :---: | :---: | :---: | :---:
/user/getStar | GET | Github Token API(**Required**) | | Error: Internal server error Success: show the starred repo | Get All Starred Repos
/user/createRepo | POST | Github Token AP (**Required**) | name:String(**Required**)  | Error: Internal server error  Success: success create new repo | Create New Github Repository
/user/otherRepo/ | POST | Github Token API(**Required**) | username: String(**required**) | Error: Internal server error Success: show the starred repo | Show Other Repository Based on username
/user/unstar/:owner/:repo | DELETE | Github Token API(Required) | username:String(**required**) repository:String(**required**) | Error: Internal server error Success: show the starred repo | Unstar from starred repo