# ts-express-starter

## File Naming
Please use `kebab-case`
## Scripts
* `npm run print-secrets`
* `npm run validate-secrets`
  * Checks your `.env` and compares it to `/src/config/constants.ts` : `REQUIRED_SECRETS`
  * This will error if you do not have a `.env`
* `npm run generate-route`
  * creates a `modules/_sample/template-route.ts` when no argument is passed in
  * `npm run generate-route keyboard`
    * creates the `modules/keyboard` directory
    * creates a `modules/keyboard/keyboard-router.ts`
* `npm run build-swc`
  * Build tool for compiling your project very quickly


## Secrets
### Adding Secrets
If you want to add a secret to the `config` object, with the type definition:
* Add the secret key and type to: `types/index.d.ts`
#### Adding a Secret that <u>*will never*</u> change based on the environment
Add required secret keys to: `/src/config/constants.ts` in the `REQUIRED_SECRETS` array.
  * running `npm run validate-secrets` will confirm that the `REQUIRED_SECRETS` is in your environment.

#### Adding a Secret that <u>*will*</u> change based on the environment

If you need to have a secret that changes based on the environment `production`/`uat`, but you want the same reference in the application:
* Add the `production` key normally
* Add the `production` key to `/src/config/constants.ts` in the `SECRET_CHANGES_FOR_UAT` array.
* Add the `uat` key with a `_UAT` suffix

##### Example:

```
API_KEY=abc
API_KEY_UAT=XYZ
```

* In the app, secrets are stored in the `config` object
  * In `production`:
    * `config.API_KEY` will equal `abc`
  * All other cases like: `uat`:
    * `config.API_KEY` will equal `XYZ`

Test this out using:
```bash
npm run print-secrets
```
Then run this...

```bash
NODE_ENV=production npm run print-secrets
```

### Environment variable parsing

```
FOO=bar
BAZ=2
BEEP=false
BOOP=some,thing,that,goes,wow
# note how we use an asterisk here to turn off the parsing for this variable
BLEEP=false*
# note how we use an asterisk in the array to turn off parsing for an array key value
PING=ping,true*,2,100
# note a string between bacticks won't be parsed
PONG=`some,thing,that,goes,wow`
```
Parsed environment variables:
```javascript
{
  // String
  FOO: 'bar',
  // Number
  BAZ: 2,
  // Boolean
  BEEP: false,
  // Array
  BOOP: [ 'some', 'thing', 'that', 'goes', 'wow' ],
  // NOTE: this was not parsed due to the * asterisk override above
  BLEEP: 'false',
  // NOTE: only the "true*" above was opted out through the use of an asterisk
  PING: [ 'ping', 'true', 2, 100 ],
  // NOTE: this was not parsed because the string was between bacticks
  PONG: 'some,thing,that,goes,wow'
}
```

## Node Version
`v16.13.0`