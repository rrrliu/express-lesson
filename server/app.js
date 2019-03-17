const express = require('express');
const cors = require('cors')
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use(cors());

app.listen(port, () => console.log(`App running on port ${port}`));

module.exports = app;