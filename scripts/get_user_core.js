import {executeSQL} from './execute_db.js';

export async function getUserById(id) {
    //   const bcrypt = require('bcrypt');
      const query = `SELECT * FROM users WHERE id = "${id}"`;
      try {
        const result = await executeSQL(query);
        console.log('informacion del usuario:', result);
      } catch (err) {
        console.error(err);
      }
    }