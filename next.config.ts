import path from "node:path";
import type { NextConfig } from "next";

const projectRoot = __dirname;

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: path.resolve(projectRoot),
};

export default nextConfig;

