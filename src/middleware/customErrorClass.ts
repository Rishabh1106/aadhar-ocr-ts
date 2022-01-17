export interface ValidationError {
  statusCode?: number;
  message :string
}

export class ValidationError extends Error {
  constructor(msg: string, code: number) {
    super();
    this.message = msg;
    this.statusCode = code;
  }
}

export const handleError = (err, res) => {
  const { message, statusCode } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};
