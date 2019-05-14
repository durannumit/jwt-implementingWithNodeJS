//imports
const express = require('express');
const app = express();
const port = 5000;
//new 
const Users = require('./data/users.json');
//Endpoints
app.get('/', (req, res) => {
  let dateTime = new Date();
 
  res.send({
    time: dateTime.getTime()
  });
});
//listen port
app.listen(port);
console.log(`Listening on port ${port}.`);