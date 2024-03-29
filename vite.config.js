import fs from "fs";
import * as path from "path";
import { defineConfig, splitVendorChunkPlugin, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import federation from "@originjs/vite-plugin-federation";
import { lingui } from "@lingui/vite-plugin";

export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), "VITE_APP");
  const envWithProcessPrefix = {
    global: {},
    "process.env": `${JSON.stringify(env)}`,
  };
  return {
    plugins: [
      react({
        babel: {
          plugins: ["macros"],
        },
      }),
      lingui(),
      splitVendorChunkPlugin(),
      federation({
        options: {
          workspaceRoot: __dirname,
          outputPath: "dist",
        },
        name: "hostapp",
        filename: "remoteEntry.js",
        remotes: {
          // remoteapp: 'http://localhost:5002/assets/remoteEntry.js',
        },
        shared: ["react", "react-dom", "react-router-dom"],
      }),
    ],
    define: envWithProcessPrefix,
    server: {
      port: 8080,
      proxy: "https://pixinvent.com/",
      cors: {
        origin: ["https://pixinvent.com/", "http://localhost:8080"],
        methods: ["GET", "PATCH", "PUT", "POST", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ["node_modules", "./src/assets"],
        },
      },
      postcss: {
        plugins: [require("postcss-rtl")()],
      },
    },
    resolve: {
      alias: [
        {
          find: /^~.+/,
          replacement: (val) => {
            return val.replace(/^~/, "");
          },
        },
        { find: "stream", replacement: "stream-browserify" },
        { find: "crypto", replacement: "crypto-browserify" },
        { find: "@src", replacement: path.resolve(__dirname, "src") },
        { find: "@store", replacement: path.resolve(__dirname, "src/redux") },
        {
          find: "@configs",
          replacement: path.resolve(__dirname, "src/configs"),
        },
        {
          find: "url",
          replacement: "rollup-plugin-node-polyfills/polyfills/url",
        },
        {
          find: "@styles",
          replacement: path.resolve(__dirname, "src/@core/scss"),
        },
        {
          find: "util",
          replacement: "rollup-plugin-node-polyfills/polyfills/util",
        },
        {
          find: "zlib",
          replacement: "rollup-plugin-node-polyfills/polyfills/zlib",
        },
        {
          find: "@utils",
          replacement: path.resolve(__dirname, "src/utility/Utils"),
        },
        {
          find: "@hooks",
          replacement: path.resolve(__dirname, "src/utility/hooks"),
        },
        { find: "@views", replacement: path.resolve(__dirname, "src/views") },
        {
          find: "@customcomponents",
          replacement: path.resolve(__dirname, "src/Components"),
        },
        {
          find: "@assets",
          replacement: path.resolve(__dirname, "src/@core/assets"),
        },
        {
          find: "@layouts",
          replacement: path.resolve(__dirname, "src/@core/layouts"),
        },
        {
          find: "assert",
          replacement: "rollup-plugin-node-polyfills/polyfills/assert",
        },
        {
          find: "buffer",
          replacement: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
        },
        {
          find: "process",
          replacement: "rollup-plugin-node-polyfills/polyfills/process-es6",
        },
        {
          find: "@components",
          replacement: path.resolve(__dirname, "src/@core/components"),
        },
      ],
    },
    esbuild: {
      loader: "jsx",
      include: /.\/src\/.*\.js?$/,
      exclude: [],
      jsx: "automatic",
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          ".js": "jsx",
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true,
          }),
          {
            name: "load-js-files-as-jsx",
            setup(build) {
              build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
                loader: "jsx",
                contents: await fs.readFileSync(args.path, "utf8"),
              }));
            },
          },
        ],
      },
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        plugins: [rollupNodePolyFill()],
      },
    },
  };
});
