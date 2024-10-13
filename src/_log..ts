import { AppError } from "./_error";

export type LogLevel =
  | "NONE"
  | "DEBUG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "CRITICAL";

function log(level: LogLevel, content: string | Error, data?: unknown): void {
  // Do not log if running tests
  if (process && process.env && process.env.DISABLE_LOGS === "true") {
    return;
  }

  if (level === "NONE") return;

  let message = `${level}: `;
  if (typeof content === "string") message += content;
  else message += `${content.name} - ${content.message}`;

  console.log(
    JSON.stringify({
      _logLevel: level,
      message,
      data,
    }),
  );
}

export const logger = {
  debug: (content: string | Error, data?: unknown) =>
    log("DEBUG", content, data),
  info: (content: string | Error, data?: unknown) => log("INFO", content, data),
  warn: (content: string | Error, data?: unknown) => log("WARN", content, data),
  error: (content: string | Error, data?: unknown) =>
    log("ERROR", content, data),
  critical: (content: string | Error, data?: unknown) =>
    log("CRITICAL", content, data),
  logAppError(appError: AppError): void {
    log(appError.logLevel, appError, {
      name: appError.name,
      code: appError.code,
      message: appError.message,
      httpStatus: appError.httpStatus,
      data: appError.data,
      responseBody: appError.responseBody,
      previous: appError.previous,
      stack: appError.stack
        ? appError.stack
            .split("\n")
            .splice(1)
            .map((k) => k.trim())
        : [],
    });
  },
};
