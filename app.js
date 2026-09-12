const express = require("express");
const sequelize = require("./config/database");

require("./models/associations");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Assignment 5 Sequelize API is running" });
});

const PORT = 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });