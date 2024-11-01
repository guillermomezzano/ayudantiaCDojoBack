import jwt from "jsonwebtoken";
const JWT_SECRET = "$ecRet0_";

const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  // console.log(header)
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no enviado" }); // Aquí corregido el status code
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.toString() }); // Aquí corregido el status code
  }
};

export default verifyToken;
