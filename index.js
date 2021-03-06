const express = require('express');
const app = express();

// NEW CODE BLOCK STARTS HERE
const { Pool } = require('pg');
const pool = new Pool({ database: 'coursereviews' });
// NEW CODE BLOCK ENDS HERE

const port = 8000;

const reviews = [
  { class: 'cs61b', rating: 9, year: 2020, text: 'fun class' },
  { class: 'ee16a', rating: 5, year: 2019, text: 'difficult but worth' },
  { class: 'espm50ac', rating: 10, year: 2020, text: 'easy and fun' },
  { class: 'cs61b', rating: 4, year: 2018, text: 'not well taught :(' },
];

app.get('/', (request, response) => {
  response.send('Hello, world but from an Express server now! 🤩');
});

app.get('/reviews', async (request, response) => {
  try {
    const query = await pool.query(
      'SELECT class, rating, review_year, review_text FROM reviews;'
    );
    response.send(query.rows);
  } catch (error) {
    response.status(500).send(error.stack);
  }
});

app.get('/reviews/:classname', async (request, response) => {
  const { classname } = request.params;
  const { rating, after } = request.query;
  try {
    const query = await pool.query(
      `SELECT CLASS,
             rating,
             review_year,
             review_text
      FROM reviews
      WHERE (CLASS = $1)
      AND (LENGTH($2) = 0
           OR rating = $2 :: INT)
      AND (LENGTH($3) = 0
           OR review_year >= $3 :: INT);`,
      [classname, rating || '', after || '']
    );
    response.send(query.rows);
  } catch (error) {
    response.status(500).send(error.stack);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/reviews', async (request, response) => {
  try {
    if (isValidReview(request.body)) {
      await pool.query(
        `INSERT INTO reviews (class, rating, review_text, review_year)
          VALUES ($1, $2, $3, $4);`,
        [
          request.body.class,
          request.body.rating,
          request.body.text,
          request.body.year,
        ]
      );
      response.send(`Successfully added review.`);
    } else {
      response.status(400).send('Invalid request body');
    }
  } catch (error) {
    response.status(500).send(error.stack);
  }
});

const isValidReview = (review) => {
  return (
    typeof review.class === 'string' &&
    typeof review.rating === 'number' &&
    typeof review.text === 'string' &&
    typeof review.year === 'number'
  );
};

app.listen(port, () => console.log(`App running on port ${port}`));
