const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS users`);
  db.run(`DROP TABLE IF EXISTS user_dates`);

  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('admin', 'user', 'moderator')) NOT NULL DEFAULT 'user'
  )`);

  db.run(`CREATE TABLE user_dates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date_present TEXT NOT NULL,
    authorize TEXT CHECK(authorize IN ('progress', 'true', 'false')) NOT NULL DEFAULT 'progress',
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  db.run(
    `INSERT INTO users (username, email, password,role) VALUES ('admin', 'admin@laplateforme.io', '$2b$10$D9YAUKRWxQ1oKW7ne2/Ru.lNcHCZ2v4BuKHTt8Hl.58M2vOYoP20.','admin')`
  );
});

module.exports = db;
