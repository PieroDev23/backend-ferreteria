import { LogLevel } from "./_log.";
import { STATUS_CODES } from "./_statusCodes";

export type Info = Partial<{
  statusCode: keyof typeof STATUS_CODES;
  logLevel: LogLevel;
  code: string;
  message: string;
  data: unknown;
  responseBody: unknown;
}>;

export class AppError extends Error {
  httpStatus: {
    code: number;
    name: keyof typeof STATUS_CODES;
  };
  logLevel: LogLevel;
  code: string;
  message: string;
  data?: unknown;
  responseBody?: unknown;
  previous?: Error;

  constructor(info: Info, previous?: Error) {
    super(info.message);

    this.httpStatus = {
      code: STATUS_CODES[info.statusCode || "BAD_REQUEST"],
      name: info.statusCode || "BAD_REQUEST",
    };
    this.logLevel = info.logLevel || "ERROR";
    this.code = info.code || "UnknownError";
    this.message = info.message || "";
    this.data = info.data;
    this.responseBody = info.responseBody;
    this.previous = previous;
  }

  static fromError(error: Error | AppError): AppError {
    if (error instanceof AppError) {
      return error;
    }
    return new AppError(
      {
        message: error.message,
        code: "UnhandledError",
        logLevel: "ERROR",
        statusCode: "INTERNAL_SERVER_ERROR",
        data: { error },
      },
      error,
    );
  }
}
