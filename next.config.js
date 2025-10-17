/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/AWS-IVS-Test', // 改成你的 GitHub repository 名稱
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
