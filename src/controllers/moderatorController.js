const dateModel = require("../models/dateModel");

const moderatorController = {
  getAllDates: async (req, res) => {
    try {
      const dates = await dateModel.findAllDates();
      res.json(dates);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateDateStatus: async (req, res) => {
    const { dateId } = req.params;
    const { status } = req.body; // a faire plus tard verifier('progress', 'true', 'false')
    try {
      const updated = await dateModel.updateDateStatus(dateId, status);
      if (!updated) {
        return res
          .status(404)
          .send("Date non trouvée ou aucun changement effectué.");
      }
      res.send("Statut de la date mis à jour avec succès.");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = moderatorController;
