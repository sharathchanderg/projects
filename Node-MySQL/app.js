const express = require("express");
const app = express();
const notesRoutes = require("./routes/note.routes");
const sequelize = require("./config/db.config");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/notes", notesRoutes);

// Test Api
app.get("/", (req, res) => {
  return res.send({ message: "Hello World!" });
});

// Start server
const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Error syncing database:", err));
