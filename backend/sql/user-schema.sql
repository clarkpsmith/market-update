CREATE TABLE users (
  username VARCHAR(25) NOT NULL PRIMARY KEY, 
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE users_watchlist (
  username VARCHAR(25) NOT NULL REFERENCES users ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  PRIMARY KEY (username, ticker)
  

);
