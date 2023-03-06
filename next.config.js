/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    /* ポケ一覧取得が128kB以上必要なので拡張 */
    largePageDataBytes: 256 * 1000 /* bytes */,
    appDir: true,
    serverComponentsExternalPackages: ["bcrypt"],
  },
  images: {
    remotePatterns: [
      /* 画像URL */
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PokeAPI/**",
      },
    ],
  },
  /* ssh2が使用しているcpu-features内の
  cpu-features.nodeのparseエラー対策 */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
