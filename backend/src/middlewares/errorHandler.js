// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
  }
}

// Not Found Error Handler
export const notFoundErrorHandler = (req, res, next) => {
  const error = new AppError(`Not Found: ${req.originalUrl}`, 404);
  next(error);
};

// General Error Handler
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { AppError };
