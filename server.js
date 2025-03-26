const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy user data
const users = [
  { id: 1, name: "Marie Curie", email: "marie.curie@example.com", age: 66, role: "General User", password: "marie123" },
  { id: 2, name: "James Bond", email: "james.bond@example.com", age: 40, role: "Admin", password: "bond007" },
  { id: 3, name: "Alan Turing", email: "alan.turing@example.com", age: 41, role: "General User", password: "turingAI" },
  { id: 4, name: "Ada Lovelace", email: "ada.lovelace@example.com", age: 36, role: "Admin", password: "adaMath" }
];

// Middleware to check admin role
const verifyAdmin = (req, res, next) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || user.role !== "Admin") {
    return res.status(403).json({ success: false, message: "Access denied. Admins only." });
  }
  
  next();
};

// Default route to check server status
app.get("/", (req, res) => {
  res.send("API is running");
});

// Public route to get all users (Admins only)
app.get("/users", verifyAdmin, (req, res) => {
  res.json(users);
});

// Route to get only admin users
app.get("/admin/users", verifyAdmin, (req, res) => {
  const adminUsers = users.filter(user => user.role === "Admin");
  res.json(adminUsers);
});

// Login route (checks email & password)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
