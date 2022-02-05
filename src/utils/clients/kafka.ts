import { ConsumerConfig, Kafka, KafkaConfig, ProducerConfig } from 'kafkajs';

const createKafkaClient = (config: KafkaConfig) => {
    const kafka = new Kafka(config);

    return {
        createKafkaProducer: async (producerConfig?: ProducerConfig) => {
            const producer = kafka.producer(producerConfig);
            await producer.connect();
            return producer;
        },
        createKafkaConsumer: async (consumerConfig?: ConsumerConfig) => {
            const consumer = kafka.consumer(consumerConfig);
            await consumer.connect();
            return consumer;
        },
    };
};

export { createKafkaClient };
