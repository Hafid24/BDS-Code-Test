require("dotenv").config();
const Pool = require("pg").Pool;
const crypto = require("crypto");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
});

function generateID(length) {
  const set = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.randomBytes(length);
  let chars = [];

  for (var i = 0; i < bytes.length; i++) {
    chars.push(set[bytes[i] % set.length]);
  }

  return chars.join("");
}

const getUsers = () => {
  return pool.query("SELECT * FROM users ORDER BY id ASC");
};

const findUserByEmail = (email) => {
  return pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

const createUser = (user) => {
  const { username, usertype, firstname, lastname, email, password } = user;
  const id = generateID(256);
  pool.query(
    `INSERT INTO users (id, username, usertype, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7 )`,
    [id, username, usertype, firstname, lastname, email, password],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Success creating new user");
      }
    }
  );
  return id;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  findUserByEmail
};
