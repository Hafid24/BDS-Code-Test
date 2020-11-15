const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const userQueries = require("../../Queries/userQueries");

router.delete(
  "/",
  auth,
  [
    check("id", "Please provide an id")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await userQueries.getUserById(req.user.id);
      const userToDelete = await userQueries.getUserById(req.body.id);

      if (user.rows[0].usertype == "admin") {
        if (userToDelete.rows[0].usertype == "admin")
          res.status(503).send("Cannot delete the Admin");
        else {
          userQueries.deleteUser(req.body.id);
          res.send("User deleted successfully!");
        }
      } else {
        res.status(503).send("Admin required for this action");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
