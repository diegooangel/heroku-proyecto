
const pool = require('../utils/db');
const {
    DB_T_USERS

} = process.env;

const getAllUsers = async() => {
    try {

        const query = `
            SELECT 
                id_user,
                email,
                password,
                date
            FROM 
                ${DB_T_USERS}
            WHERE 
                available = 1`;
                
        const result = await pool.query(query);

        return result;
    } catch (error) {
        throw error;
    }
}

const insertUser = async(obj) => {
    try {
        
        const query = `
            INSERT INTO ${DB_T_USERS} SET ?
        `;

        return await pool.query(query, [obj]);

    } catch (error) {
        throw error;
    }
}

const getSingleUser = async(id) => {
    try {
        const query = `
            SELECT
                id_user,
                email,
                password,
                date
            FROM
                ${DB_T_USERS}
                
            WHERE
                id_user = ?
                AND
                available = 1
        `;

        return await pool.query(query, [id])

    } catch (error) {
        throw error;
    }
}

const deleteUser = async(id) => {
    try {
        const query = `
            UPDATE
                ${DB_T_USERS}
            SET
                available = 0
            WHERE
                id_user = ?
                AND
                available = 1
        `;

        const result = await pool.query(query, [id]);

        return result.affectedRows;

    } catch (error) {
        throw error;
    }
}

const updateUser = async (id, obj) => {
    try {
        
        const query = `
            UPDATE
                ${DB_T_USERS}
            SET email = ?, password = ?, date = ?
            WHERE id_user = ? AND available = 1
        `;

        return await pool.query(query, [obj.email, obj.password, obj.date, id]);

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    insertUser,
    getSingleUser,
    deleteUser,
    updateUser
}

