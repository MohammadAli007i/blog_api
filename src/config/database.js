const mongoose = require("mongoose");
const config = require("./config");
const logger = require("../utils/logger");

const connect = async () => {
  try {
    await mongoose.connect(config.mongodb.url, config.mongodb.options);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = {
  connect,
};
