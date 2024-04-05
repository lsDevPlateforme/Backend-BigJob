const userModel = require("../models/userModel");
const dateModel = require("../models/dateModel");

const userController = {
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await userModel.findUserById(userId);
      if (!user) {
        return res.status(404).send("Profil non trouvé.");
      }
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  addDate: async (req, res) => {
    const { date } = req.body;
    const userId = req.user.id;
    try {
      const newDate = await dateModel.createDateForUser(userId, date);
      res.status(201).json(newDate);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = userController;
