const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('src'));

app.listen(3000, () => {
  console.log('---------------------------');
  console.log('Server Running on Port 3000');
  console.log('---------------------------');
});



