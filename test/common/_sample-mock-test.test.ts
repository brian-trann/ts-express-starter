import { createElasticClient } from '../../src/utils/clients';
import type { Client as ElasticClient } from '@elastic/elasticsearch/api/new';
let mockClient: ElasticClient;
beforeAll(() => {
    const { client, mock } = createElasticClient(null, 'test');
    mockClient = client;
    ///////
    mock.add(
        {
            method: 'POST',
            path: '/indexName/_search',
            body: { query: { match_all: {} } },
        },
        () => {
            return {
                hits: {
                    total: { value: 1, relation: 'eq' },
                    hits: [{ _source: { baz: 'faz' } }],
                },
            };
        }
    );

    mock.add(
        {
            method: 'POST',
            path: '/indexName/_search',
            body: { query: { match: { foo: 'this body needs to match for it to use this mock' } } },
        },
        () => {
            return {
                hits: {
                    total: { value: 0, relation: 'eq' },
                    hits: [],
                },
            };
        }
    );
    /**
     * In the example above, every search request gets the first response,
     * while every search request that uses the query described in the
     * second mock gets the second response.
     */

    /////

    mock.add(
        {
            method: 'GET',
            path: '/:index/_count',
        },
        () => {
            return { count: 42 };
        }
    );
});

describe('mock test', () => {
    it('should return 42', async () => {
        const response = await mockClient.count({ index: 'foo' });

        expect(response.body.count).toEqual(42);
    });
    // i cant get a general catch-all search working :(
    it('should return one hit', async () => {
        const response = await mockClient.search({ index: 'indexName', body: { query: { match_all: {} } } });
        const hits = response.body.hits.hits;
        expect(hits.length).toEqual(1);
    });
    it('should return zero hits', async () => {
        const response = await mockClient.search({
            index: 'indexName',
            body: { query: { match: { foo: 'this body needs to match for it to use this mock' } } },
        });
        const hits = response.body.hits.hits;
        expect(hits.length).toEqual(0);
    });
});
