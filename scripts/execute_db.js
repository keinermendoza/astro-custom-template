import readline from 'node:readline';
import { exec } from 'child_process';
import 'dotenv/config';
import env from 'env-var';

async function executeSQL(query) {
   
  const dbName = env.get('DB_NAME').required().asString();
  const isDevelopmentMode = env.get('DEBUG').required().asBool(); 
  const exceutionEnviorment = isDevelopmentMode ? '--local' : '--remote';

  console.log(exceutionEnviorment)

      return new Promise((resolve, reject) => {
        exec(`npx wrangler d1 execute ${dbName} ${exceutionEnviorment} --command='${query}'`, (error, stdout, stderr) => {
          if (error) {
            return reject(`Error: ${stderr}`);
          }
          resolve(stdout);
        });
      });
   
  }

function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
  }

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

export {executeSQL, askQuestion, rl}
  