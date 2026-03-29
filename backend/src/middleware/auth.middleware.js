import jwt from "jsonwebtoken";

export const authmiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No auth token" });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId, clerk_id: payload.clerkId };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};