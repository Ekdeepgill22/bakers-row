import jwt from "jsonwebtoken";
import { createuser, getUserByClerkID } from "../repositories/user.repository.js";

export const loginUser = async (req, res) => {
  try {
    const { clerkToken, name, email, phone } = req.body;

    if (!clerkToken) {
      return res.status(400).json({ success: false, message: "No Clerk token provided" });
    }

    // Verify the Clerk session token via Clerk's REST API
    const clerkRes = await fetch("https://api.clerk.com/v1/tokens/verify", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: clerkToken }),
    });

    if (!clerkRes.ok) {
      return res.status(401).json({ success: false, message: "Invalid Clerk token" });
    }

    const clerkData = await clerkRes.json();
    const clerk_id = clerkData.sub;  // Clerk user ID

    // Upsert user in your DB
    let user = await getUserByClerkID(clerk_id);
    if (!user) {
      user = await createuser({ clerk_id, name, email, phone });
    }

    // Issue your own JWT
    const token = jwt.sign(
      { userId: user.id, clerkId: clerk_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};