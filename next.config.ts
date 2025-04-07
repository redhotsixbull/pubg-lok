import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Next.js를 정적으로 내보내기 위한 설정
  basePath: "/pubg-lok", // 레포지토리 이름을 입력하세요
  assetPrefix: "https://redhotsixbull.github.io/pubg-lok", // GitHub Pages URL을 입력하세요
};

export default nextConfig;
