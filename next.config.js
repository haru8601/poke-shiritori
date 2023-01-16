/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    /* ポケ一覧取得が128kB以上必要なので拡張 */
    largePageDataBytes: 256 * 1000, /* bytes */
  }
};

module.exports = nextConfig;