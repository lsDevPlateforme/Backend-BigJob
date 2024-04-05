const userModel = require("../models/userModel");

const adminController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateUserRole: async (req, res) => {
    const { userId } = req.params;
    const { newRole } = req.body; // a faire plus tard verifier ('user', 'moderator', 'admin')
    try {
      const updated = await userModel.updateUserRole(userId, newRole);
      if (!updated) {
        return res
          .status(404)
          .send("Utilisateur non trouvé ou aucun changement effectué.");
      }
      res.send("Rôle de l'utilisateur mis à jour avec succès.");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = adminController;
