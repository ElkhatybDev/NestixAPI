const jwt = require("jsonwebtoken");
const users = require("../data/users.json");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret_key"
    );

    const user = users.find(user => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    req.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = authMiddleware;