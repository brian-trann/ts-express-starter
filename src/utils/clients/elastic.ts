import { Client, ClientOptions } from '@elastic/elasticsearch';
import Mock from '@elastic/elasticsearch-mock';
import type { Client as ElasticClient } from '@elastic/elasticsearch/api/new';

const createElasticClient = (authOptions: ClientOptions, type: 'default' | 'test' = 'default') => {
    if (process.env['ENVIRONMENT'] === 'test' || type === 'test') {
        const mock = new Mock();
        // @ts-expect-error @elastic/elasticsearch
        const client: ElasticClient = new Client({
            node: 'http://localhost:9200',
            Connection: mock.getConnection(),
        });
        return { client, mock };
    } else {
        // @ts-expect-error @elastic/elasticsearch
        const client: ElasticClient = new Client(authOptions);
        return { client, mock: null };
    }
};

export { createElasticClient };
