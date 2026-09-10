/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_EMERGENCY_HOTLINE: string;
  readonly VITE_ENCRYPTION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
