const jwt = require("jsonwebtoken");
const users = require("../data/users.json");

const login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  //test
  if (password !== "123456") {
    return res.status(401).json({
      message: "Invalid password"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET || "secret_key",
    { expiresIn: "1d" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
  });
};

const getAuthUser = (req, res) => {
  res.status(200).json({
    message: "Auth user fetched successfully",
    data: req.user
  });
};

module.exports = {
  login,
  getAuthUser
};