const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const winston = require('winston');

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(morgan('dev')); // Log requests in development
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(compression()); // Enable gzip compression

// Body parser
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Node.js API' });
});

// Error handler middleware
app.use((err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send({ message: 'Internal Server Error' });
});

module.exports = app;
