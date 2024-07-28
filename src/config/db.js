const mongoose = require('mongoose');

const connect = (callback) => {
  mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
    callback();
  });
};

module.exports = {
  connect
};