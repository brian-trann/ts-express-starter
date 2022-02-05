import path from 'path';
import { mkdir, lstat, readFile, writeFile } from 'fs/promises';

const providedName = process.argv[2] || '_sample';
const templatePath = path.resolve(__dirname, 'templates');
const modulePath = path.resolve(__dirname).replace('scripts', 'src/modules');
const samplePath = path.resolve(modulePath, providedName);

const handleExit = (error = 'Error. Exiting.') => {
    console.error('\x1b[31m%s\x1b[0m', error, '\n');
    process.exit(1);
};

const _read = async (path: string) => {
    const buff = await readFile(path).catch(handleExit);
    if (Buffer.isBuffer(buff)) {
        return buff;
    } else {
        handleExit(`Error. Could not read ${path}`);
    }
};

(async () => {
    const response = await lstat(samplePath)
        .then((res) => {
            if (res.isDirectory()) {
                handleExit(`Sample Directory already exists... Exiting...\n${samplePath}`);
            }
        })
        .catch(async () => {
            await mkdir(samplePath);
            return await lstat(samplePath);
        });
    if (!response || !response.isDirectory()) {
        handleExit('Something went wrong. Exiting...');
    }
    const sampleData = await _read(path.resolve(templatePath, 'template-route.ts'));
    const sampleRoute = path.join(samplePath, `${providedName}-router.ts`);

    await writeFile(sampleRoute, sampleData).catch(handleExit);

    console.log('\x1b[32m%s\x1b[0m', '\nSuccessfully generated a sample route.');
    console.log('\x1b[36m%s\x1b[0m', `${sampleRoute}\n`);
})();
