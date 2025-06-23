const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // check if user exists
    const existing = await pool.query("SELECT * FROM Carboncredit WHERE email = $1", [email]);
    if (existing.rows.length > 0) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const carbonTokens = role === "user" ? 100 : 1000;

    const newUser = await pool.query(
      `INSERT INTO Carboncredit (username, email, password, role, carbon_tokens, avatar, join_date)
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
      [username, email, hashedPassword, role, carbonTokens, "/placeholder.svg?height=32&width=32"]
    );

    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ user: newUser.rows[0], token });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
  console.log("User registered:", username, email, role);
  
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = await pool.query("SELECT * FROM Carboncredit WHERE email = $1", [email]);
    if (userQuery.rows.length === 0) return res.status(400).json({ message: "User not found" });

    const user = userQuery.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };