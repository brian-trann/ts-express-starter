import fs from 'fs';
import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';
import logger from './logger';
import { REQUIRED_SECRETS, SECRET_CHANGES_FOR_UAT } from './constants';
import { parseEnvs } from '../utils/config-utils';
import { validateSecrets } from '../utils/config-utils';

let env;
if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables');
    env = dotenv.config({ path: '.env' });
} else {
    env = dotenv.config();
}
const parsedEnv = dotenvParseVariables(env.parsed);

const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production';
// Anything else is treated as 'dev' || 'test'

const valid = validateSecrets(parsedEnv, REQUIRED_SECRETS);

const config = parseEnvs(prod, parsedEnv, REQUIRED_SECRETS, SECRET_CHANGES_FOR_UAT);

export { config, valid };
