const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const moderatorRoutes = require("./routes/moderatorRoute");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/moderator", moderatorRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API!");
});

// Gestion erreurs - Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Quelque chose s'est mal passé!");
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;
