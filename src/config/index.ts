import { valid } from './config';
import { createAxiosClient, createElasticClient, createKafkaClient, createPostgresClient } from '../utils/clients';

import { Secrets } from '../types';

const createClients = async (config: Secrets) => {
    const clients = {
        axios: createAxiosClient(),
        elastic: createElasticClient({
            node: '',
            auth: {
                username: '',
                password: '',
            },
        }),
        kafka: {
            consumer: await createKafkaClient({ clientId: '', brokers: [''] }).createKafkaConsumer(),
            producer: await createKafkaClient({ clientId: '', brokers: [''] }).createKafkaProducer(),
        },
        pg: createPostgresClient({ connectionString: config.PG_DATABASE_URI }),
    };

    return clients;
};

export const createAppConfig = async (config: Secrets) => {
    const clients = await createClients(config);
    return { config, valid, clients };
};
