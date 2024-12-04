import {askQuestion, rl} from './execute_db.js';
import {getUserById} from './get_user_core.js';
  
  (async () => {
    const id = await askQuestion('Ingrese el id del ususario: ');
  
    await getUserById(id);
    rl.close();
  })();
