CREATE DOMAIN email AS TEXT CHECK (VALUE ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');

CREATE DOMAIN username AS TEXT CHECK (VALUE ~ '^[A-Za-z0-9._]+$');


CREATE TABLE "users"
( id VARCHAR(256), 
  usertype VARCHAR(10),
  username username,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  email email,
  password VARCHAR(256)
  );