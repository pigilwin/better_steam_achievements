import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigpaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
	plugins: [react(), tsconfigpaths(), eslint()],
	server: {
		host: '127.0.0.1',
		port: 3000
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