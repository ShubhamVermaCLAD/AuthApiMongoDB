const mongoose = require('mongoose');

// connect to mongoose
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connect to Mongodb")
);
