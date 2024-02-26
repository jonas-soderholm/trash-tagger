const authenticate = (req, res, next) => {
  // Check if the user is authenticated (e.g., by checking session or token)
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

module.exports = authenticate;
