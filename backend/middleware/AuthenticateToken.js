const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // If no token, return unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token is not valid, return forbidden

    req.user = user; // Assign the decoded user to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
