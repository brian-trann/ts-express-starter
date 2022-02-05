/**
 * REQUIRED_SECRETS are required to make the app run
 */
export const REQUIRED_SECRETS = [
    'API_KEY',
    'API_URL',
    'BOOLEAN',
    'PG_DATABASE_URI',
    'PORT',
    'REQUIRED_USERNAME',
    'REQUIRED_PASSWORD',
];

/**
 * SECRET_CHANGES_FOR_UAT are the keys that need to use a different value.
 *
 * For example, if the production 'API_URL' value is different for development, add the key here
 *
 * Please read the README.md
 */
export const SECRET_CHANGES_FOR_UAT = new Set(['API_KEY']);
