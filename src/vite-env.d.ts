/// <reference types="vite/client" />
declare namespace NodeJS {
  // eslint-disable-next-line unicorn/prevent-abbreviations, @typescript-eslint/consistent-type-definitions
  interface ProcessEnv {
    NODE_ENV: string;
  }
}
