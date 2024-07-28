const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

app.use(express.json());
app.use('/users', userRoutes);

db.connect(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});