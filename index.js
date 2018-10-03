const express = require('express');
const port = process.env.PORT || 3000;

express()
  .use('/', express.static(__dirname + '/'))
  .get('/', (req,res) => res.sendFile(__dirname + '/index.html'))
  .listen(port, () => console.log(`App is listening on port ${port}!`));
