const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9092"],
});

const topic = "order";
const producer = kafka.producer();

const produceMessages = async () => {
  await producer.connect();
  try {
    // Sending a single message
    await producer.send({
      topic,
      messages: [{ value: "Hello Kafka" }],
    });

    // Sending multiple messages
    await producer.send({
      topic,
      messages: [
        { value: "Message 1" },
        { value: "Message 2" },
        { value: "Message 3" },
      ],
    });

    console.log("Messages were sent successfully");
  } catch (error) {
    console.error("Error producing messages", error);
  } finally {
    await producer.disconnect();
  }
};

produceMessages();
