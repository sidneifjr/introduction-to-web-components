import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: 'dist',
		assetsDir: 'static', // Controla o diretório onde o js será inserido, durante o build. É possível inserí-lo dentro de static, junto de outros assets.
    // sourcemap: true,
		base: './',

		rollupOptions: {
			output: {
				manualChunks: () => '', // Gera um único chunk para o css e js (cada), após o build.

				assetFileNames: ({ name }) => {
					if(/\.(gif|jpe?g|png)$/.test(name ?? '')){
						return 'static/images/[name][extname]'
					}

					if(/\.(svg)$/.test(name ?? '')){
						return 'static/icons/[name][extname]'
					}

					if (/\.(ico)$/.test(name ?? '')) {
						return 'static/icons/[name][extname]'
					}

					if(/\.(ttf)$/.test(name ?? '')){
						return 'static/fonts/[name]-[hash][extname]'
					}

					return 'static/[name][extname]'
				},
			},
		},
	},
})