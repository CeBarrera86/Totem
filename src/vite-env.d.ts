/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_DIR?: string;
	readonly VITE_PORT?: string;
	readonly VITE_API_URL?: string;
	readonly VITE_API_TIMEOUT?: string;
	readonly VITE_API_KEY?: string;
	readonly VITE_TOTEM_TOKEN?: string;
	readonly VITE_PRINT_MODE?: 'auto' | 'agent' | 'browser';
	readonly VITE_PRINT_PRINTER_NAME?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}