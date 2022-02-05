import { Client, ClientConfig } from 'pg';
import { config } from '../../config/config';
const createPostgresClient = (pgConfig: ClientConfig) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _sampleConfig = {
        user: 'dbuser',
        host: 'database.server.com',
        database: 'mydb',
        password: 'secretpassword',
        port: 3211,
    };
    
    const databaseUri = process.env.NODE_ENV === 'test' ? 'project_test' : config.PG_DATABASE_URI;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _anotherConfig: ClientConfig = {
        connectionString: databaseUri,
    };
    const client = new Client(pgConfig);
    client.connect();

    return client;
};

export { createPostgresClient };
