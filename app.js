const server = require('http').createServer();

const kafka = require('kafka-node');

// from environment variables
const socketServerUrl = process.env.SOCKET_SERVER_URL;
const kafkaHost = process.env.KAFKA_URL;
const kafkaTopicName = process.env.KAFKA_TOPIC_NAME;

const socket = require('socket.io-client')(socketServerUrl);
const client = new kafka.KafkaClient({ kafkaHost });
const Producer = kafka.Producer;
const producer = new Producer(client);


let integersQueue;

const sendEvent = (topic, messages) => {
    const payloads = [{
        topic,
        messages,
        timestamp: Date.now()
    }];
    producer.send(payloads, function (err, data) {
    });
}

server.listen(5002, () => {
    socket.on('connect', function () {
        socket.on('numberStream', (numberList) => {
            integersQueue = [...numberList];
            sendEvent(kafkaTopicName, integersQueue);
        });
        socket.on('continueIntegers', (integer) => {
            integersQueue.push(integer);
            sendEvent(kafkaTopicName, integer);
        });
    });
});