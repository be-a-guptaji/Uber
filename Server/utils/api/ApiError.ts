class ApiError extends Error {
  statusCode: number;
  message: string;
  success: boolean;
  errors: string[];

  // Constructor with type annotations
  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: string[] = [],
    stack: string = ""
  ) {
    super(message); // Call the Error constructor with the message

    // Set the properties of the ApiError class
    this.statusCode = statusCode;
    this.message = message; // Ensure message is passed to the parent class (Error)
    this.success = false;
    this.errors = errors;

    // Capture stack trace if provided, else use default
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Optionally, override the toJSON method to format the error response
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      errors: this.errors,
    };
  }
}

// Export the ApiError class
export { ApiError };
