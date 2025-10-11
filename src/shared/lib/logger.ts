/**
 * Logger
 * Structured logging utility
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";
  private minLevel: LogLevel = this.isDevelopment ? "debug" : "info";

  private levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  private shouldLog(level: LogLevel): boolean {
    return this.levels[level] >= this.levels[this.minLevel];
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `\n${JSON.stringify(context, null, 2)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog("debug")) {
      console.debug(this.formatMessage("debug", message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog("info")) {
      console.info(this.formatMessage("info", message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog("warn")) {
      console.warn(this.formatMessage("warn", message, context));
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (this.shouldLog("error")) {
      const errorContext = {
        ...context,
        ...(error instanceof Error && {
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
        }),
      };

      console.error(this.formatMessage("error", message, errorContext));

      // TODO: Send to monitoring service in production
      // if (!this.isDevelopment) {
      //   Sentry.captureException(error, { extra: errorContext });
      // }
    }
  }

  /**
   * Log API request
   */
  logRequest(method: string, endpoint: string, params?: Record<string, unknown>): void {
    this.debug(`API Request: ${method} ${endpoint}`, params);
  }

  /**
   * Log API response
   */
  logResponse(method: string, endpoint: string, status: number, duration: number): void {
    this.debug(`API Response: ${method} ${endpoint}`, {
      status,
      duration: `${duration}ms`,
    });
  }

  /**
   * Log performance metric
   */
  logPerformance(metric: string, value: number, context?: LogContext): void {
    this.info(`Performance: ${metric}`, { value, ...context });
  }

  /**
   * Log user action
   */
  logUserAction(action: string, context?: LogContext): void {
    this.info(`User Action: ${action}`, context);
  }

  /**
   * Log blockchain transaction
   */
  logTransaction(
    type: "sent" | "confirmed" | "failed",
    txHash?: string,
    context?: LogContext
  ): void {
    this.info(`Transaction ${type}`, { txHash, ...context });
  }
}

export const logger = new Logger();
