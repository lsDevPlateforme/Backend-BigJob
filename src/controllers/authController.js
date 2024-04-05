const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authController = {
  signup: async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 9);
    try {
      const newUser = await userModel.createUser(
        username,
        email,
        hashedPassword
      );
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findUserByEmail(email);
      if (!user) return res.status(404).send("Utilisateur non trouvé");

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).send("Mot de passe incorrect");

      const token = jwt.sign({ id: user.id, role: user.role }, "laplateforme", {
        expiresIn: "24h",
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = authController;
