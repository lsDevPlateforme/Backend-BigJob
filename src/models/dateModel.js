const db = require("../config/initdb");

const dateModel = {
  createDateForUser: (userId, date, status = "progress") => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO user_dates (user_id, date_present, authorize) VALUES (?, ?, ?)`;
      db.run(query, [userId, date, status], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, userId, date, status });
        }
      });
    });
  },

  findAllDates: () => {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT user_dates.id, user_dates.date_present, user_dates.authorize, users.username FROM user_dates JOIN users ON user_dates.user_id = users.id",
        [],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  },

  findDateById: (dateId) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM user_dates WHERE id = ?", [dateId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  updateDateStatus: (dateId, newStatus) => {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE user_dates SET authorize = ? WHERE id = ?",
        [newStatus, dateId],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ updated: this.changes });
          }
        }
      );
    });
  },
};

module.exports = dateModel;
