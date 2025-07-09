class ApiError<T> {
  statusCode: number;
  code: string;
  message: string;
  payload?: T;

  constructor(statusCode: number, code: string, message: string, payload?: T) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.payload = payload;
  }
}

export default ApiError;
