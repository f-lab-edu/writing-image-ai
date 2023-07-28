import { defineConfig, loadEnv } from "vite";
import { transformSync } from "@swc/core";
import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "fs";

// 한 곳에서 swc 설정을 관리하기 위해서 파일을 불러와서 쓰기
const swcConfig = JSON.parse(fs.readFileSync(".swcrc", "utf-8"));

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log({ mode });
  console.log({ command });
  console.log({ env: env.VITE_ENV });

  if (mode === "development") {
    return {
      build: {
        target: "esnext",
        emptyOutDir: true,
        minify: "esbuild",
        // cssMinify: "esbuild", // 공식 문서 설명: Default is the same as build.minify
      },
      server: {
        open: true,
        strictPort: true,
        port: 3000,
      },
      css: {
        devSourcemap: true,
      },
    };
  }

  if (mode === "production") {
    return {
      plugins: [
        basicSsl(),
        {
          name: "swc-transform",
          transform(code, id) {
            if (/\.ts?$/.test(id)) {
              const swcResult = transformSync(code, {
                filename: id,
                ...swcConfig,
                sourceMaps: "inline",
              });
              return swcResult?.code ?? "";
            }
          },
        },
      ],
      preview: {
        host: true,
        port: 8080,
        https: true,
      },
    };
  }

  return {};
});

// sourceMaps: 최종적으로 브라우저에서 실행되는 코드와 원본 소스 코드 간의 맵핑을 제공하는 파일
