import bcrypt from 'bcryptjs';

import {executeSQL, askQuestion, rl} from './execute_db.js';

// Crear un usuario con una contraseña hasheada
async function createUser(username, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = `INSERT INTO users (username, password, is_admin) VALUES ("${username}", "${hashedPassword}", 1)`;
  try {
    const result = await executeSQL(query);
    console.log('Usuario creado con éxito:', result);
  } catch (err) {
    console.error(err);
  }
}
  
  (async () => {
    const username = await askQuestion('Ingrese el nombre de usuario: ');
    const password = await askQuestion('Ingrese la contraseña: ');
  
    await createUser(username, password);
    rl.close();
  })();
