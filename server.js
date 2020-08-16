require('dotenv').config({ path: './config.env' });

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION. SHUTING DOWN SERVER...');
  console.log(err.name, err.message);

  process.exit(1);
});

const mongoose = require('mongoose');
const app = require('./app');

// connect to DB
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to DB successfully :)'));

// start server
const server = app.listen(process.env.PORT, () => {
  console.log(`server runing at port ${process.env.PORT}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION. SHUTING DOWN SERVER...');
  console.log(err.name, err.message);
  console.log(err.stack);

  server.close(() => {
    process.exit(1);
  });
});
