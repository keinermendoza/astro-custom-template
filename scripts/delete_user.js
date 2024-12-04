import {executeSQL, askQuestion, rl} from './execute_db.js';
import {getUserById} from './get_user_core.js';

async function deleteUserById(id) {
  const query = `DELETE FROM users WHERE id = "${id}"`;
  try {
    const result = await executeSQL(query);
    console.log('Usuario eliminado con éxito:', result);
  } catch (err) {
    console.error(err);
  }
}
  
  (async () => {
    const id = await askQuestion('Ingrese el id del ususario a eliminar: ');
    await getUserById(id);
    
    const confirmation = await askQuestion('Estas seguro que deseas eliminar este usuario? para confirmar ingrese "Y" y presione "Enter": ');
    if (confirmation.trim().toLowerCase() === "y") {
        await deleteUserById(id);
    }
    rl.close();
  })();
