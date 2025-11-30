import db from "../config/db.js";
import { xorEncrypt, xorDecrypt } from "../crypto/xor.js";

// kunci sederhana untuk XOR; ubah sesuai kebutuhan
const KEY = "secretkey123";

export const createUser = (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "name and email required" });

    const encName = xorEncrypt(name, KEY);
    const encEmail = xorEncrypt(email, KEY);
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [encName, encEmail], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "db error" });
      }
      res.json({ id: result.insertId, message: "created" });
    });
  } catch (e) {
    res.status(500).json({ error: "server error" });
  }
};

export const getUsers = (req, res) => {
  db.query("SELECT * FROM users ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: "db error" });
    const items = rows.map(r => ({
      id: r.id,
      name: xorDecrypt(r.name, KEY),
      email: xorDecrypt(r.email, KEY)
    }));
    res.json(items);
  });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "name and email required" });

  const encName = xorEncrypt(name, KEY);
  const encEmail = xorEncrypt(email, KEY);

  db.query("UPDATE users SET name=?, email=? WHERE id=?", [encName, encEmail, id], (err) => {
    if (err) return res.status(500).json({ error: "db error" });
    res.json({ message: "updated" });
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: "db error" });
    res.json({ message: "deleted" });
  });
};
