const express = require('express');
const app = express();

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

app.get('/reviews', (request, response) => {
  response.send(reviews);
});

app.get('/reviews/:classname', (request, response) => {
  const { classname } = request.params;
  const { rating, after } = request.query;
  const reviewMatches = (review) => {
    const classMatches = review.class === classname;
    const ratingMatches =
      !('rating' in request.query) || review.rating == rating;
    const yearMatches = !('after' in request.query) || review.year >= after;
    return classMatches && ratingMatches && yearMatches;
  };
  response.send(
    reviews.filter((review) => {
      const classMatches = review.class === classname;
      const ratingMatches =
        !('rating' in request.query) || review.rating == rating;
      const yearMatches = !('after' in request.query) || review.year >= after;
      return classMatches && ratingMatches && yearMatches;
    })
  );
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/reviews', (request, response) => {
  if (isValidReview(request.body)) {
    reviews.push(request.body);
    response.send(`Successfully added review.`);
  } else {
    response.status(400).send('Invalid request body');
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
