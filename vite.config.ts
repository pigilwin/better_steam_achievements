import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigpaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigpaths()],
    server: {
        port: 3000,
    },
    define: {
        VITE_APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    build: {
        outDir: './build',
        minify: 'esbuild',
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
                entryFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
});