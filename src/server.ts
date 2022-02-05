import createApp from './app';
import { createAppConfig } from './config';
import { config } from './config/config';
/**
 * Start Express Server
 */

const runServer = async () => {
    const app = await createApp();
    const appConfig = await createAppConfig(config);
    const { valid } = appConfig;
    app.listen(config.PORT, () => {
        if (valid.error) {
            console.error('\x1b[31m%s\x1b[0m', '\nMissing Secrets:', valid.missingSecrets, '\n');
            console.error('\x1b[31m%s\x1b[0m', 'Exit the application and add missing secrets.\n');
        }
        if (!config.IS_PROD) {
            console.log(
                '\x1b[32m%s\x1b[0m',
                `\nApp is running at http://localhost:${config.PORT} in ${app.get('env')} mode`
            );
        }
        console.log('Press CTRL-C to stop\n');
    });
};
runServer();
