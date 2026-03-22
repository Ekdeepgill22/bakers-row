import { createuser } from "../repositories/user.repository.js";

export const registerUser = async(req,res) => {
    try{
        const {clerk_id,name,email,phone} = req.body

        const user = await createuser({clerk_id,name,email,phone});

        res.status(201).json({
            success: true,
            data: user,
        });
    }catch(error){
        console.error(error);

        res.status(500).json({
            success: false,
            message: "User Creation Failed",
        });
    }
};