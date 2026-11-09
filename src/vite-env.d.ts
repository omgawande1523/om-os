/// <reference types="vite/client" />

/** Injected by vite.config.ts at build time. */
declare const __RESUME_META__: { sizeBytes: number; modified: string };
declare const __BUILD_YEAR__: number;

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY?: string;
}
