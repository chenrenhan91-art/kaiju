import type { NextConfig } from "next";

const onGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: onGithubPages ? "/kaiju" : "",
  assetPrefix: onGithubPages ? "/kaiju" : "",
};

export default nextConfig;
