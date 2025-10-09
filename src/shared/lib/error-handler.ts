/**
 * Error Handler
 * Centralized error handling and logging
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class APIError extends AppError {
  constructor(
    message: string,
    statusCode: number,
    context?: Record<string, unknown>
  ) {
    super(message, "API_ERROR", statusCode, context);
    this.name = "APIError";
  }
}

export class BlockchainError extends AppError {
  constructor(
    message: string,
    code?: string,
    context?: Record<string, unknown>
  ) {
    super(message, code, undefined, context);
    this.name = "BlockchainError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, "VALIDATION_ERROR", 400, context);
    this.name = "ValidationError";
  }
}

/**
 * Error handler for async functions
 */
export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError("An unknown error occurred");
}

/**
 * Log error to console (in development) or monitoring service (in production)
 */
export function logError(
  error: AppError | Error,
  context?: Record<string, unknown>
): void {
  const errorInfo = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    ...(error instanceof AppError && {
      code: error.code,
      statusCode: error.statusCode,
      context: error.context,
    }),
    ...context,
  };

  if (process.env.NODE_ENV === "development") {
    console.error("Error:", errorInfo);
  } else {
    // TODO: Send to monitoring service (Sentry, etc.)
    // Sentry.captureException(error, { extra: errorInfo });
    console.error("Error:", errorInfo);
  }
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof APIError) {
    if (error.statusCode === 404) {
      return "Resource not found";
    }
    if (error.statusCode === 401) {
      return "Please connect your wallet to continue";
    }
    if (error.statusCode === 403) {
      return "You do not have permission to perform this action";
    }
    if (error.statusCode && error.statusCode >= 500) {
      return "Server error. Please try again later";
    }
  }

  if (error instanceof BlockchainError) {
    if (error.code === "4001") {
      return "Transaction rejected by user";
    }
    if (error.code === "-32002") {
      return "Request already pending in wallet";
    }
    return "Blockchain transaction failed. Please try again";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again";
}

/**
 * Error boundary fallback component props
 */
export interface ErrorBoundaryFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * Async error wrapper
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  onError?: (error: AppError) => void
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    const appError = handleError(error);
    logError(appError);
    onError?.(appError);
    return null;
  }
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    delay?: number;
    backoff?: number;
  } = {}
): Promise<T> {
  const { maxRetries = 3, delay = 1000, backoff = 2 } = options;

  let lastError: Error | undefined;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (i < maxRetries) {
        const waitTime = delay * Math.pow(backoff, i);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError || new Error("Retry failed");
}
