import type { NextConfig } from "next";

const nextConfig: NextConfig = { output: "export", basePath: "/Clubedo-cardapio", assetPrefix: "/Clubedo-cardapio/", trailingSlash: true, images: { unoptimized: true } };
export default nextConfig;
