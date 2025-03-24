class ApiError extends Error {
  statusCode: number;
  message: string;
  data: any | null;
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
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;

    // Capture stack trace if provided, else use default
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
