export interface KogptGenerationParam {
  prompt: string; // 한국어만 지원
  max_tokens: number; // 최대 토큰 수 2048
  temperature?: number; // 온도 설정: 0~1 실수 사용 (기본값: 1)
  top_p?: number; // 상위 확률 설정: 0~1 실수 사용 (기본값: 1)
  n?: number; // KoGPT가 생성할 결과 수 (최대 16, 기본값: 1)
}

export interface KogptGenerationResponse {
  id: string;
  generations: {
    text: string;
    token: number;
  }[];
  usage: {
    prompt_tokens: number;
    generated_tokens: number;
    total_tokens: number;
  };
}

export interface KogptGenerationFail {
  code: number;
  msg: string;
}

