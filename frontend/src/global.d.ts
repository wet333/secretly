export {};

declare global {
    // Extend the global window object, for loading ENV variables at runtime
    interface Window {
        __RUNTIME_CONFIG__?: {
            API_URL?: string;
        };
    }
}