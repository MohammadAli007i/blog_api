const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const config = require("./config/config");
const morgan = require("./config/morgan");
const { authLimiter } = require("./middleware/rateLimiter");
// const authRoutes = require("./routes/auth.routes");
// const blogRoutes = require("./routes/blog.route");
// const docRoute = require("./routes/docs.route");
const routes = require("./routes");
// const commentRoutes = require("./routes/comment.route");
const { errorConverter, errorHandler } = require("./middleware/error");
const ApiError = require("./utils/ApiError");

const app = express();

// if we're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
app.set("trust proxy", true);

// request logging
if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/api/auth", authLimiter);
}

// api routes
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
