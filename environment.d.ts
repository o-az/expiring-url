interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly PORT: number;
  readonly TABLE_NAME: string;
  readonly DATABASE_URL: string;
  readonly PUBLIC_URL: string;
}

interface Process {
  readonly env: EnvironmentVariables;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}

// interface ImportMetaEnv extends EnvironmentVariables {}

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }
