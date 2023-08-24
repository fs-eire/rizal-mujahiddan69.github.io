/** @type {import('next').NextConfig} */

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };
    config.plugins.push(
      new NodePolyfillPlugin(),
      new CopyPlugin({
        patterns: [
          // {
          //   from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.wasm",
          //   to: "static/chunks/app",
          // },
          // {
          //   from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd.jsep.wasm",
          //   to: "static/chunks/app",
          // },
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm",
            to: "static/chunks/app",
          },
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm",
            to: "static/chunks/app",
          },
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm-threaded.wasm",
            to: "static/chunks/app",
          },
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm.wasm",
            to: "static/chunks/app",
          },
          {
            from: "./models/dtc_cv.onnx",
            to: "static/chunks/app",
          },
        ],
      })
    );
    if (!isServer) {
      config.devtool = "eval-source-map";
      for (const plugin of config.plugins) {
        if (plugin.constructor.name === "ModuleNotFoundPlugin") {
          plugin.options.fallback = {
            dgram: false,
            fs: false,
            net: false,
            tls: false,
            child_process: false,
          };
          console.log(plugins);
          break;
        }
      }
    }
    // console.log(config);
    return config;
  },
};

// const withPWA = require("next-pwa")({
//   dest: "public",
// });
// module.exports = nextConfig;
// module.exports = withBundleAnalyzer(withPWA(nextConfig));
module.exports = withBundleAnalyzer(nextConfig);
// console.log(module.exports);
