
const pool = require('../utils/db');
const {
    DB_T_USERS
} = process.env;

class Signin {

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async login() {

        try {
            const query = "SELECT email, password FROM ?? WHERE email = ? AND password = ? AND available = 1";
            const params = [DB_T_USERS, this.email, this.password];

            const result = pool.query(query, params);

            return result;

        } catch (error) {
            throw error;
        }

    }

}

module.exports = Signin;