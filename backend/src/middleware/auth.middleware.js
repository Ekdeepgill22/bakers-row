import {verifyToken} from "@clerk/backend";

export const authmiddleware = async(req,res,next) => {
    try{
        const authheader = req.headers.authorization;

        if(!authheader){
            return res.status(401).json({
                success: false,
                message : "No auth token",
            });
        }

        const token = authheader.split(" ")[1];

        const payload = await verifyToken(token,{
            secretKey: process.env.CLERK_SECRET_KEY,
        });

        req.user = {
            clerk_id: payload.sub,
        };

        next();
    }catch(err){
        console.error("Auth Error",err);

        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
};