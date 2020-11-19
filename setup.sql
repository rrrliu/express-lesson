DROP DATABASE IF EXISTS coursereviews;

CREATE DATABASE coursereviews;

\c coursereviews;

DROP TABLE IF EXISTS reviews;

DROP TABLE IF EXISTS users;

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    class VARCHAR,
    rating INTEGER,
    review_text VARCHAR,
    review_year INTEGER
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    hashed_password VARCHAR,
    salt VARCHAR
);

INSERT INTO reviews (class, rating, review_year, review_text)
VALUES ('cs61b', 9, 2020, 'fun class'),
       ('ee16a', 5, 2019, 'difficult but worth'),
       ('espm50ac', 10, 2020, 'easy and fun'),
       ('cs61b', 4, 2018, 'not well taught :(');

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE cofed TO root;
