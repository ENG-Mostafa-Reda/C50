const express = require("express");
const sequelize = require("./config/database");

require("./models/associations");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error.message);
  });