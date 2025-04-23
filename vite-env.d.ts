/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_FEATURE_FLAG?: string;    
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
