const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;
  console.log(req.headers["authorization"]);
  if (!token) {
    return res
      .status(403)
      .send("Un token est nécessaire pour l'authentification");
  }

  try {
    const decoded = jwt.verify(token, "helloWolrd");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Token invalide");
  }
};

const requireRole = (requiredRole) => {
  return (req, res, next) => {
    verifyToken(req, res, () => {
      console.log(req.user);
      console.log(req.user.role);
      if (req.user && req.user.role === requiredRole) {
        next();
      } else {
        res.status(403).send("Accès refusé : rôle insuffisant");
      }
    });
  };
};

module.exports = { verifyToken, requireRole };
