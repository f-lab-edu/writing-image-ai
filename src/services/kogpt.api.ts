import { type KogptGenerationParam, type KogptGenerationResponse } from '../types/kogpt.type';
import { kakoApi } from './axios.config';

export const generationByKoGPT = async (param: KogptGenerationParam) =>
  await kakoApi.post<KogptGenerationResponse>('/v1/inference/kogpt/generation', param).then((res) => {
    return res.data;
  });
