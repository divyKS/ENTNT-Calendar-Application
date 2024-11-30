const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "";

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user details (userId, role) to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

const isUser = (req, res, next) => {
  if (req.user.role !== "User") {
    return res.status(403).json({ message: "Access denied: Users only" });
  }
  next();
};

module.exports = { authenticateUser, isAdmin, isUser };
