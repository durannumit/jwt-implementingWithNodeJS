const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  let dateTime = new Date();

  res.send({
    time: dateTime.getTime()
  });
});

app.listen(port);
console.log(`Listening on port ${port}.`);