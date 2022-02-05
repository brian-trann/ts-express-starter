import { ParsedVariables } from 'dotenv-parse-variables';
import { has } from 'lodash';
import { Secrets } from '../types';
const secretInChanges = (secret: string, changes: Set<string>) => {
    return changes.has(secret);
};

export const parseEnvs = (
    prod: boolean,
    processEnv: NodeJS.ProcessEnv | ParsedVariables,
    secretConstants: Array<string>,
    secretChanges: Set<string>
) => {
    const secrets: Secrets = { IS_PROD: prod };
    secretConstants.forEach((secret) => {
        if (!prod && secretInChanges(secret, secretChanges)) {
            const uatSecret = `${secret}_UAT`;
            secrets[secret] = processEnv[uatSecret];
        } else {
            secrets[secret] = processEnv[secret];
        }
    });

    return Object.freeze(secrets);
};

export const validateSecrets = (obj: NodeJS.ProcessEnv | ParsedVariables, required: Array<string>) => {
    const missingSecrets = required.filter((key) => !has(obj, key));
    const isMissingSecrets = missingSecrets.length > 0;

    return { error: isMissingSecrets, missingSecrets };
};
