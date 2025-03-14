import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: "access denied" });
  }

  if (token.startsWith("bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  req.user = verified;

  next();
};
