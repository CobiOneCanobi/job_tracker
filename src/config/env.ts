interface Env {
  port: number
  jwtSecret: string
  jwtExpiresIn: string
  databaseUrl: string
  nodeEnv: 'development' | 'production' | 'test'
}

function validateEnv(): Env {
  const missing: string[] = [];

  if (!process.env.DATABASE_URL) missing.push('DATABASE_URL');
  if (!process.env.JWT_SECRET) missing.push('JWT_SECRET');

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        'Please check your .env file',
    );
  }

  return {
    port: parseInt(process.env.PORT || '3000', 10),
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    databaseUrl: process.env.DATABASE_URL!,
    nodeEnv: (process.env.NODE_ENV || 'development') as Env['nodeEnv'],
  };
}

// Validate and export config
export const env = validateEnv();
