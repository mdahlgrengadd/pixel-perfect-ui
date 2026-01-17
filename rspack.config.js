const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const rspack = require('@rspack/core');
const path = require('path');

// Determine if we're building for production (GitHub Pages)
const isProduction = process.env.NODE_ENV === 'production' || process.env.BASE_URL;
const BASE_URL = process.env.BASE_URL || '/PrometheOS-src/';

// Helper function to get remote URL based on environment
function getRemotePublicPath(remoteName, port) {
  if (isProduction) {
    return `${BASE_URL}apps/${remoteName}/`;
  }
  return `http://localhost:${port}/`;
}

function getHostUrl() {
  if (isProduction) {
    return BASE_URL;
  }
  return process.env.HOST_URL || 'http://localhost:3011';
}

// Configuration constants
const HOST_URL = getHostUrl();
const DEV_SERVER_PORT = 3017;

module.exports = {
  mode: isProduction ? 'production' : 'development',
  target: 'web', // Explicitly set target to web to fix compiler.platform undefined error
  entry: './src/index.ts',

  devServer: {
    port: DEV_SERVER_PORT,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    client: {
      overlay: {
        runtimeErrors: (error) => {
          // Suppress ResizeObserver loop errors in development
          if (error?.message === 'ResizeObserver loop completed with undelivered notifications.') {
            console.warn('ResizeObserver loop completed with undelivered notifications. (This is harmless and can be ignored)');
            return false; // Don't show overlay for this error
          }
          return true; // Show overlay for other errors
        },
      },
    },
  },

  output: {
    chunkLoading: 'jsonp',
    chunkFormat: 'array-push',
    publicPath: getRemotePublicPath('photoshop', DEV_SERVER_PORT),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@shared/ui-kit$': path.resolve(__dirname, '../../packages/shared-ui-kit/src/index.ts'),
      '@shared/api-client$': path.resolve(__dirname, '../../packages/shared-api-client/src/index.ts'),
      '@shared/system-api$': path.resolve(__dirname, '../../packages/shared-system-api/src/index.ts'),
      '@shared/mcp-protocol$': path.resolve(__dirname, '../../packages/shared-mcp-protocol/src/index.ts'),
    },
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
              decorators: false,
              dynamicImport: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'photoshop',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/bootstrap.tsx',
      },
      remotes: {
        desktop_host: `desktop_host@${HOST_URL}remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
          eager: true,
        },
        'react/jsx-runtime': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
          eager: true,
        },
        '@shared/api-client': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
          eager: true,
        },
        '@shared/ui-kit': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
          eager: true,
        },
        '@shared/system-api': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
          eager: true,
        },
        '@shared/mcp-protocol': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
          eager: true,
        },
        '@tanstack/react-query': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
        },
        'framer-motion': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
        },
      },
      dts: false, // Disable DTS plugin to avoid compiler.platform undefined error in rspack
    }),

    new rspack.HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],

  optimization: {
    splitChunks: false,
  },
};
