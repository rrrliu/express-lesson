const express = require('express');
const app = express();

const { Pool } = require('pg');
const pool = new Pool({ database: 'coursereviews' });
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

async function validatePassword(user, password) {
  const { salt, hashed_password: expectedHashedPassword } = user;
  const actualHashedPassword = await bcrypt.hash(password, salt);
  return actualHashedPassword === expectedHashedPassword;
}

function isAuthenticated(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  response.status(401).send('Not authorized');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'boo', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const query = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      if (query.rows.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const user = query.rows[0];
      const passwordsMatch = await validatePassword(user, password);
      if (!passwordsMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  console.log('serializing', user.id);
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  console.log('deserializing', id);
  try {
    const query = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return done(null, query.rows[0]);
  } catch (err) {
    console.log({ err });
    return done(err);
  }
});

const port = 8000;

app.get('/', (request, response) => {
  response.send('Hello, world but from an Express server now! 🤩');
});

app.post('/register', async (request, response) => {
  const { username, password } = request.body;
  if (!username || !password) {
    return response.status(400).send('Enter a username and password');
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await pool.query(
      'INSERT INTO users (username, salt, hashed_password) VALUES ($1, $2, $3)',
      [username, salt, hashedPassword]
    );
    response.send(`Inserted ${username}`);
  } catch (err) {
    console.log(err.stack);
    response.status(500).send(err.stack);
  }
});

app.post('/login', passport.authenticate('local'), (request, response) => {
  response.send('ok');
});

app.post('/logout', (req, res) => {
  req.logOut();
  res.send('logged out!');
});

app.get('/user', async (request, response) => {
  const { username } = request.user;
  response.send({ username });
});

app.get('/reviews', isAuthenticated, async (request, response) => {
  try {
    const query = await pool.query(
      'SELECT class, rating, review_year, review_text FROM reviews;'
    );
    response.send(query.rows);
  } catch (error) {
    console.log(error.stack);
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
