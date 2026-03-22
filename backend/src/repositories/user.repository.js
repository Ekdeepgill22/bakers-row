import pool from "../config/db.js";

export const createuser = async ({clerk_id,name,email,phone}) => {
    const query = `
    INSERT INTO users (clerk_id,name,email,phone)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;

    const value = [clerk_id,name,email,phone];
    const result = await pool.query(query,value);
    return result.rows[0];
};

export const getUserByClerkID = async(clerk_id) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE clerk_id = $1",
        [clerk_id]
    );
    return result.rows[0];
};
