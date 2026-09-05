import type { NextConfig } from 'next';

const sitePath = '/Clubedo-cardapio';
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: sitePath,
  assetPrefix: `${sitePath}/`,
  images: { unoptimized: true },
};
export default nextConfig;
