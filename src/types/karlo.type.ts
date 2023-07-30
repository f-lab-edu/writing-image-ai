type KarloImageFormat = 'webp' | 'jpeg' | 'png'; // 이미지 파일 형식, 다음 중 하나 webp, jpeg, png (기본값: webp)
type KarloScale = 2 | 4; // 확대 배율, 2 또는 4 중 하나 (기본값: 2)
type KarloReturnType = 'url' | 'base64_string'; // 결과 반환 형식, 다음 중 하나 url, base64_string (기본값: url)
type KarloScheduler = 'decoder_ddim_v_prediction' | 'decoder_ddpm_v_prediction'; // 디코더를 통한 노이즈 제거 단계에서 사용할 스케줄러 다음 중 1 (기본값: decoder_ddim_v_prediction), decoder_ddpm_v_prediction
type KarloSamples = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // 생성할 이미지 수 (기본값: 1, 최소: 1, 최대: 8)

interface KarloResponseBase {
  id: string;
  model_version: string;
}

export interface CreateIamgeByKarloParams {
  prompt?: string; // 이미지를 묘사하는 제시어, 영문만 지원 (최대: 256자)
  negative_prompt?: string; // 	이미지 생성 시 제외할 요소를 묘사하는 부정 제시어, 영문만 지원 (최대: 256자)
  width?: number; // 	이미지 가로 크기, 8의 배수여야 함 (단위: 픽셀, 기본값: 512, 최소: 384, 최대 640)
  height?: number; // 	이미지 세로 크기, 8의 배수여야 함 (단위: 픽셀, 기본값: 512, 최소: 384, 최대 640)
  upscale?: boolean; // 이미지 크기 확대 여부 true: 확대 false: 확대하지 않음
  scale?: KarloScale;
  image_format?: KarloImageFormat; // 이미지 파일 형식, 다음 중 하나 webp, jpeg, png (기본값: webp)
  image_quality?: number; // 이미지 품질 (기본값: 70, 최소: 1, 최대: 100)
  samples?: KarloSamples;
  return_type?: KarloReturnType; // 결과 반환 형식, 다음 중 하나 url, base64_string (기본값: url)
  prior_num_inference_steps?: number; // 이미지 생성 과정의 노이즈 제거 단계 수 (기본값: 25, 최소: 10, 최대 100)
  prior_guidance_scale?: number; // 이미지 생성 과정의 노이즈 제거 척도 (기본값: 5.0, 최소: 1.0, 최대 20.0)
  num_inference_steps?: number; // 디코더를 통한 노이즈 제거 단계 수 (기본값: 50, 최소: 10, 최대 100)
  guidance_scale?: number; // 디코더를 통한 노이즈 제거 척도 (기본값: 5.0, 최소: 1.0, 최대 20.0)
  scheduler?: KarloScheduler;
  seed?: number[]; // 각 이미지 생성 작업에 사용할 시드(Seed) 값, 생성할 이미지 수와 같은 길이의 배열이어야 함, 0 이상 4,294,967,295 이하 숫자로 구성,  파라미터 미사용 시 무작위(Random) 시드 값으로 이미지 생성 (기본값: null)
  nsfw_checker?: boolean; // 생성할 이미지에 대한 NSFW 검사하기 수행 여부 true: 확인 false: 확인하지 않음 (기본값: false)
}

export interface CreateIamgeByKarloResponse extends KarloResponseBase {
  images: {
    id: string;
    seed: number;
    image: string;
  }[];
}

export interface UpscaleIamgeByKarloParams {
  images: string[]; // 확대할 이미지 파일을 Base64 인코딩한 값, 이미지 크기는 가로세로 최대 1024 픽셀 이하여야 함, webp, png, jpeg, heic 형식의 이미지 파일 지원, 최대 8개
  scale?: KarloScale;
  image_format?: KarloImageFormat;
  image_quality?: number; // 이미지 품질 (기본값: 70, 최소: 1, 최대: 100)
  return_type?: KarloReturnType;
}

export interface UpscaleIamgeByKarloResponse extends KarloResponseBase {
  images: string[];
}

export interface VariationsIamgeByKarloParams {
  image: string; // 변형할 이미지 파일을 Base64 인코딩한 값
  prompt?: string; // 이미지를 묘사하는 제시어, 영문만 지원 (최대: 256자)
  negative_prompt?: string; // 이미지 생성 시 제외할 요소를 묘사하는 부정 제시어, 영문만 지원 (최대: 256자)
  width?: number; // 이미지 가로 크기, 8의 배수여야 함 (단위: 픽셀, 기본값: 512, 최소: 384, 최대 640)
  height?: number; // 이미지 세로 크기, 8의 배수여야 함 (단위: 픽셀, 기본값: 512, 최소: 384, 최대 640)
  upscale?: boolean; // 이미지 크기 확대 여부 true: 확대 false: 확대하지 않음
  scale?: KarloScale;
  image_format?: KarloImageFormat;
  image_quality?: number; // 이미지 품질 (기본값: 70, 최소: 1, 최대: 100)
  samples?: KarloSamples;
  return_type?: KarloReturnType;
  num_inference_steps?: number; // 디코더를 통한 노이즈 제거 단계 수 (기본값: 50, 최소: 10, 최대 100)
  guidance_scale?: number; // 디코더를 통한 노이즈 제거 척도 (기본값: 5.0, 최소: 1.0, 최대 20.0)
  scheduler?: KarloScheduler;
  seed?: number; // 각 이미지 생성 작업에 사용할 시드(Seed) 값, 생성할 이미지 수와 같은 길이의 배열이어야 함, 0 이상 4,294,967,295 이하 숫자로 구성,  파라미터 미사용 시 무작위(Random) 시드 값으로 이미지 생성 (기본값: null)
  nsfw_checker?: boolean; // 생성할 이미지에 대한 NSFW 검사하기 수행 여부 true: 확인 false: 확인하지 않음 (기본값: false)
}

export interface VariationsIamgeByKarloResponse extends KarloResponseBase {
  images: {
    id: string;
    image: string;
    seed: number;
  }[];
}

export interface NSFWCheckerIamgeByKarloParams {
  images: string[]; // 검사 대상 이미지 파일을 Base64 인코딩한 값의 배열 (최대: 8개)
}

export interface NSFWCheckerIamgeByKarloResponse extends KarloResponseBase {
  results: {
    nsfw_content_detected: boolean;
    nsfw_score: number;
  }[];
}
