import { KogptGenerationParam, KogptGenerationResponse } from '../types/kogpt.type';
import { kakoApi } from './axios.config';

export const generationByKoGPT = (param: KogptGenerationParam) =>
  kakoApi.post<KogptGenerationResponse>('/v1/inference/kogpt/generation', param).then((res) => {
    return res.data;
  });
