const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: "You are not authorized",
          error: error.message,
        });
      }

      if (decoded) {
        console.log(decoded);
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};
