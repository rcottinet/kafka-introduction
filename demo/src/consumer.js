const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-consumer",
  brokers: ["localhost:9092"],
});

const topic = "order";
const consumer = kafka.consumer({
  groupId: "test-group",
});

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
        topic,
        partition,
      });
    },
  });
};

consumeMessages();
