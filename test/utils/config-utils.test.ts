import { parseEnvs, validateSecrets } from '../../src/utils/config-utils';
import _ from 'lodash';
const _secrets = {
    API_KEY: 'abc',
    API_KEY_UAT: 'XYZfdsgsdfhsdfhgsfg',
    API_URL: 'fakeurl',
    BOOLEAN: 'true',
    REQUIRED_USERNAME: 'username',
    REQUIRED_USERNAME_UAT: 'username-uat',
    REQUIRED_PASSWORD: 'password',
    REQUIRED_PASSWORD_UAT: 'password-uat',
};
const _secretConstants = ['BOOLEAN', 'API_KEY'];
const _secretChanges = new Set(['API_KEY']);

describe('parseEnvs tests', () => {
    const parsedSecretsUAT = parseEnvs(false, _secrets, _secretConstants, _secretChanges);
    const parsedSecretsPROD = parseEnvs(true, _secrets, _secretConstants, _secretChanges);
    it('should have all secrets in _secretConstants inside the result', () => {
        const missingSecrets = _secretConstants.filter((secret) => !_.has(parsedSecretsUAT, secret));
        expect(missingSecrets.length).toEqual(0);
    });
    it('should use the _UAT secret when the first argument in parseEnvs is false', () => {
        expect(parsedSecretsUAT.API_KEY).toEqual(_secrets.API_KEY_UAT);
    });
    it('should use the normal secret without the "_UAT" suffix when first argument in parseEnvs is true', () => {
        expect(parsedSecretsPROD.API_KEY).toEqual(_secrets.API_KEY);
    });
});

describe('validateSecrets tests', () => {
    it('should not have missing secrets when given valid parameters', () => {
        const { error, missingSecrets } = validateSecrets(_secrets, _secretConstants);
        expect(error).toBeFalsy();
        expect(missingSecrets.length).toEqual(0);
    });
    it('should have an error when missing secrets', () => {
        const { error, missingSecrets } = validateSecrets(_secrets, [..._secretConstants, 'TEST']);
        expect(error).toBeTruthy();
        expect(missingSecrets.length > 0).toBeTruthy();
    });
});
