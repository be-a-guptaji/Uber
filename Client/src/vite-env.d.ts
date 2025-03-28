/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_PORT: string;
  VITE_BASE_URL: string;
  VITE_SERVER_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
