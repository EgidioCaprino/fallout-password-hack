import { readFileSync } from "fs";

const packageJSON = JSON.parse(readFileSync("package.json"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath:
    process.env.CI === "true" ? `/${packageJSON.name}` : undefined,
};

export default nextConfig;
