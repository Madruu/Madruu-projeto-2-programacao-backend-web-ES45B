const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.create({ username: 'Gustavo', password: 'Teste' });
  console.log("Usuário criado");
  mongoose.disconnect();
});
