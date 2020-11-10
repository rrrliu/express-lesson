DROP DATABASE IF EXISTS coursereviews;

CREATE DATABASE coursereviews;

\c coursereviews;

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    class VARCHAR,
    rating INTEGER,
    review_text VARCHAR,
    review_year INTEGER
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE cofed TO root;
