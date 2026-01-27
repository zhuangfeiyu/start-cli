/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URI?: string
  readonly VITE_APP_TITLE?: string
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
