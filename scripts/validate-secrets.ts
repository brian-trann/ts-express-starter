import { valid } from '../src/config/config';

if (valid.error) {
    console.error('\x1b[31m%s\x1b[0m', '\nMissing Secrets:', valid.missingSecrets, '\n');
} else {
    console.log('\x1b[32m%s\x1b[0m', '\nSecrets are Valid\n');
}
