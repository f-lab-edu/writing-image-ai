import { defineConfig, loadEnv } from 'vite';
import { transformSync } from '@swc/core';
import basicSsl from '@vitejs/plugin-basic-ssl';
import fs from 'fs';

/*  한 곳에서 swc 설정을 관리하기 위해서 파일을 불러와서 쓰기 */
const swcConfig = JSON.parse(fs.readFileSync('.swcrc', 'utf-8'));

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  /*  개발 모드 설정 */
  if (mode === 'development') {
    return {
      build: {
        target: 'esnext' /*  빌드 대상을 esnext로 설정하여 최신 문법 그대로 유지 */,
        emptyOutDir: true /*  빌드 시 디렉토리를 삭제 */,
      },
      server: {
        /*  개발 서버를 설정. */
        open: true /*  실행 시, 열기 */,
        strictPort: true /*  지정한 포트 준수 */,
        port: 3000 /*  3000번 포트 사용 */,
        proxy: {
          '/kakao': {
            target: 'https://api.kakaobrain.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/kakao/, ''),
            secure: false,
            ws: true,
          },
        },
      },
      css: {
        devSourcemap: true /*  CSS 소스맵 활성화 */,
      },
    };
  }

  if (mode === 'production') {
    return {
      plugins: [
        basicSsl() /*  vite에서 지원하는 basic ssl  적용 */,
        {
          name: 'swc-transform',
          transform(code, id) {
            if (/\.ts?$/.test(id)) {
              /*  ts 코드만 js로 변환 */
              const swcResult = transformSync(code, {
                filename: id,
                ...swcConfig,
                sourceMaps: false /*  소스맵 사용하지 않기. */,
              });
              return swcResult?.code ?? '';
            }
          },
        },
      ],
      server: {
        open: true /*  실행 시, 열기 */,
        proxy: {
          '/kakao': {
            target: 'https://api.kakaobrain.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/kakao/, ''),
            secure: false,
            ws: true,
          },
        },
      },
      preview: {
        host: true,
        port: 8080,
        https: true,
      },
    };
  }

  return {};
});

/*  sourceMaps: 최종적으로 브라우저에서 실행되는 코드와 원본 소스 코드 간의 맵핑을 제공하는 파일 */
