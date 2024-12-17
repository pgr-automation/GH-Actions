const logger = require('../config/logger');

// Inside error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send({ message: 'Internal Server Error' });
});
