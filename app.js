const express = require('express');
const app = express();
const port = 8000;

// Setting up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Goodbye, world!');
});

const mentored = {
  0: 'richard',
  1: 'bianca',
};

// localhost:8000/sqrt/5

app.get('/sqrt/:number', (request, response) => {
  const number = parseInt(request.params.number, 10);
  response.send(Math.sqrt(number).toString());
});

app.get('/users/:id', (request, response) => {
  const { id } = request.params;
  response.send(mentored[id]);
});

app.post('/users', (request, response) => {
  const { userId, name } = request.body;
  mentored[userId] = name;
  response.send('Success!!');
});

app.listen(port, () => console.log(`App running on port ${port}`));
