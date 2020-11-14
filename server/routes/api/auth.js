const express = require("express");
const router = express.Router();
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

module.exports = router;
