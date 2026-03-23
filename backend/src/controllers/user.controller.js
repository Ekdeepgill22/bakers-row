import { createuser, getUserByClerkID } from "../repositories/user.repository.js";

export const registerUser = async(req,res) => {
    try{
        const clerk_id = req.user.clerk_id;

        const {name,email,phone} = req.body

        let user = await getUserByClerkID(clerk_id);

        if(user){
            return res.status(200).json({
                success: true,
                message: "User Already exists",
                data: user,
            });
        }

        user = await createuser({clerk_id,name,email,phone});

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