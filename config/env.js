// env.js
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

// Create an env object from process.env dynamically
export const ENV = new Proxy({}, {
  get: (_, prop) => process.env[prop]
});
