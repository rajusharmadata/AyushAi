import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        // Enable Fast Refresh
        fastRefresh: true,
        // Use React 17+ automatic JSX runtime
        jsxRuntime: 'automatic',
        // Enable Babel import source
        babel: {
          plugins: [
            ['@babel/plugin-transform-react-jsx', {
              runtime: 'automatic',
              importSource: 'react',
            }],
          ],
        },
      }),
      tailwindcss(),
      // Visualize bundle size
      mode === 'analyze' && visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),

    // Base public path when served in production
    base: '/',

    // Development server configuration
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'https://ayushai-1.onrender.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // Build configuration
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: mode !== 'production',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true,
        },
      },
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        input: {
          main: './index.html',
        },
        output: {
          manualChunks: {
            // Split vendor and runtime chunks
            vendor: ['react', 'react-dom', 'react-router-dom'],
            // Split other large dependencies
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-navigation-menu'],
            // Add more manual chunks as needed
          },
        },
      },
      // Assets handling
      assetsDir: 'assets',
      assetsInlineLimit: 4096, // 4kb
    },

    // Resolve configuration
    resolve: {
      alias: {
        '@': '/src',
      },
    },


    // CSS configuration
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          // Add global SCSS variables/mixins here
          additionalData: `@import "./src/styles/variables.scss";`,
        },
      },
    },


    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['@babel/runtime'],
    },
  };
});
