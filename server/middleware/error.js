import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong Mongodb ID error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;

    err = new ErrorHandler(message, 400);
  }

  // mongoose dublicate error
  if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //   wrong jwt token
  if (err.name === "JsonWebTokenError") {
    const message = `json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  // jwt expire error
  if (err.name === "TokenExpiredError") {
    const message = `json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

 
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
