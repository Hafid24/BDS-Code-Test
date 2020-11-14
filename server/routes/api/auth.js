const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const userQueries = require("../../Queries/userQueries");

router.get("/", auth, async (req, res) => {
  try {
    const user = await userQueries.getUserById(req.user.id);
    user.rows[0].password = null;
    if (user.rows[0].usertype == "admin") {
      const allUsers = await userQueries.getUsers();
      res.json({ allUsers: allUsers.rows, userType: "admin" });
    } else res.json({ user: user.rows[0], userType: "user" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // Checks email
      let user = await userQueries.findUserByEmail(email);

      if (user.rows.length < 1) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }
      // Checks password
      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Return JWT
      const payload = {
        user: {
          id: user.rows[0].id
        }
      };
      const allUsers = await userQueries.getUsers();
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: config.get("tokenExpiration") },
        (err, token) => {
          if (err) {
            throw err;
          }
          if (user.rows[0].usertype == "admin") {
            res.json({ token, allUsers: allUsers.rows, userType: "admin" });
          } else {
            res.json({ token, user: user.rows[0], userType: "user" });
          }
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
