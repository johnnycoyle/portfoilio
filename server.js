const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/src/index.html'));
});

app.get('/bundle.js', (req,res) => {
  res.sendFile(path.join(__dirname+'/build/bundle.js'))
});

app.get('/assets/styles.css', (req,res) => {
  res.sendFile(path.join(__dirname+'/src/assets/styles.css'))
});

app.get('/assets/click.mp3', (req,res) => {
  res.sendFile(path.join(__dirname+'/src/assets/click.mp3'))
});

app.listen(3000, () => {
  console.log('Server Running on Port 3000');
});



