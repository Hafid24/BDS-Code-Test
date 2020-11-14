const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

const userQueries = require("../../Queries/userQueries");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, usertype, firstname, lastname, email, password } = req.body;
  try {
    let user = await userQueries.findUserByEmail(email);

    if (user.rows.length > 0) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const allUsers = await userQueries.getUsers();
    const adminExistance = allUsers.rows.every(
      (user) => user.usertype != "admin"
    );

    if (!adminExistance && usertype == "admin") {
      return res.status(400).json({ errors: [{ msg: "Admin Exists" }] });
    }

    newUser = {
      username,
      usertype,
      firstname,
      lastname,
      email,
      password
    };

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    const id = await userQueries.createUser(newUser);

    const payload = {
      user: {
        id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: config.get("tokenExpiration") },
      (err, token) => {
        if (err) {
          throw err;
        }
        console.log("finish");
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
