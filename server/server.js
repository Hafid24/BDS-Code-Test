const express = require("express");

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

app.use("/api/register", require("./routes/api/register"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
