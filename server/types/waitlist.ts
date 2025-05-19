export interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
}

export interface WaitlistError {
  name: 'WaitlistError';
  message: string;
  statusCode: number;
  statusMessage: string;
}

export enum WaitlistErrorCodes {
  INVALID_EMAIL = 'INVALID_EMAIL',
  DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
  DATABASE_ERROR = 'DATABASE_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

export function handleWaitlistError(error: any): WaitlistError {
  const errorCode = determineErrorCode(error);
  
  return {
    name: 'WaitlistError',
    message: error.message || 'An unexpected error occurred',
    statusCode: error.statusCode || 500,
    statusMessage: getErrorStatusMessage(errorCode)
  };
}

function determineErrorCode(error: any): WaitlistErrorCodes {
  if (error.message?.includes('Invalid email')) {
    return WaitlistErrorCodes.INVALID_EMAIL;
  }
  if (error.message?.includes('already registered')) {
    return WaitlistErrorCodes.DUPLICATE_EMAIL;
  }
  if (error.message?.includes('relation "waitlist" does not exist')) {
    return WaitlistErrorCodes.DATABASE_ERROR;
  }
  return WaitlistErrorCodes.INTERNAL_ERROR;
}

function getErrorStatusMessage(errorCode: WaitlistErrorCodes): string {
  switch (errorCode) {
    case WaitlistErrorCodes.INVALID_EMAIL:
      return 'Invalid email format';
    case WaitlistErrorCodes.DUPLICATE_EMAIL:
      return 'Email already registered';
    case WaitlistErrorCodes.DATABASE_ERROR:
      return 'Database error';
    default:
      return 'Internal server error';
  }
}
