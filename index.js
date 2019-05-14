//imports
const express = require('express');
const app = express();
const port = 5000;
const jwt = require('jwt-simple'); //new
const bcrypt = require('bcrypt');
const Users = require('./data/users.json');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('jwtTokenSecret', 'expressjs-api-secret'); // new
//Endpoints
app.get('/', (req, res) => {
  let dateTime = new Date();
 
  res.send({
    time: dateTime.getTime()
  });
});
// ***** updated post request *****
app.post('/auth/login', (req, res) => { 
  // validate if payload contains data
  if (req.body.email && req.body.password) {
// find the user in the json data
    let findUser = Users.users.find((user) => {
      return (user.email === req.body.email) ? user : false
    });
if (findUser) {
      // compare the encrypted password
      bcrypt.compare(req.body.password, findUser.password, (err, result) => {
        if (result === true) {
          let expiration = new Date();
          expiration.setDate(expiration.getDate() + 7); // + 7 days
// create JSON web token
          let token = jwt.encode({
              iss: findUser.id,
              email: findUser.email,
              exp: expiration.getTime()
            },
            app.get('jwtTokenSecret')
          );
// send data
          res.send({
            token: token,
            expires: expiration,
          });
        } else {
          res.status(403).send({
            error: `Invalid email and/or password.`
          });
        }
      });
} else {
      res.status(404).send({
        error: `Could not find user '${req.body.email}'.`
      });
    }
} else {
    res.status(401).send({
      error: `Invalid email and/or password.`
    });
  }
});


//listen port
app.listen(port);
console.log(`Listening on port ${port}.`);