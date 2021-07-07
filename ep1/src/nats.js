const stan = require('node-nats-streaming');

module.exports = function (mongoClient) {
  const conn = stan.connect('test-cluster', 'test', {
    url: process.env.BROKER_URL,
  });

  conn.on('connect', () => {
    console.log('Connected to NATS Streaming');

    const opts = conn.subscriptionOptions();
    const subscription = conn.subscribe('users', opts);
    const db = mongoClient.db('ep1-mac475');

    subscription.on('message', async (message) => {
      const messageData = JSON.parse(message.getData());

      switch (messageData.eventType) {
        case 'UserCreated':
          await db.collection('users').insertOne({
            _id: messageData.entityId,
            name: messageData.entityAggregate.name,
            email: messageData.entityAggregate.email,
            password: messageData.entityAggregate.password,
          });

          break;
        case 'UserDeleted':
          await db.collection('users').deleteOne({
            _id: messageData.entityId,
          });

          break;
      }
    });
  });

  return conn;
};
