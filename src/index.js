const express = require('express');
const { getUsers } = require('./helpers');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
