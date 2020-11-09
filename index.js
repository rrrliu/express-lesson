const express = require('express');
const app = express();

const port = 8000;

// NEW CODE BLOCK STARTS HERE
const reviews = [
  { class: 'cs61b', rating: 9, year: 2020, text: 'fun class' },
  { class: 'ee16a', rating: 5, year: 2019, text: 'difficult but worth' },
  { class: 'espm50ac', rating: 10, year: 2020, text: 'easy and fun' },
  { class: 'cs61b', rating: 4, year: 2018, text: 'not well taught :(' },
];
// NEW CODE ENDS HERE

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

app.listen(port, () => console.log(`App running on port ${port}`));
