const express = require('express');
const app = express();

const port = 8000;

app.get('/', (request, response) => {
  response.send('Hello, world but from an Express server now! 🤩');
});

app.listen(port, () => console.log(`App running on port ${port}`));
