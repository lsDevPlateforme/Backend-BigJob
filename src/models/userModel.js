const db = require("../config/initdb");

const userModel = {
  createUser: (username, email, hashedPassword) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
      db.run(query, [username, email, hashedPassword], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  },

  findUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  findUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  updateUserRole: (userId, newRole) => {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE users SET role = ? WHERE id = ?",
        [newRole, userId],
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

  findAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT id, username, email, role FROM users", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
};

module.exports = userModel;
