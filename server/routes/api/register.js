const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const { check, validationResult } = require("express-validator");

const userQueries = require("../../Queries/userQueries");

const router = express.Router();

router.post(
  "/",
  [
    check("password")
      .not()
      .isEmpty(),
    check("usertype", "Type is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("username", "Please enter a username with less than 20 characters")
      .matches(/^[a-zA-Z0-9_.]*$/, "i")
      .isLength({ max: 20 })
      .not()
      .isEmpty(),
    check("firstname").isLength({ max: 100 }),
    check("lasttname").isLength({ max: 100 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      username,
      usertype,
      firstname,
      lastname,
      email,
      password
    } = req.body;
    try {
      let user = await userQueries.findUserByEmail(email);

      if (user.rows.length > 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
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
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
