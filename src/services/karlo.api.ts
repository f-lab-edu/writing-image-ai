import { commonAxios } from './axios.config';
import {
  CreateIamgeByKarloParams,
  CreateIamgeByKarloResponse,
  NSFWCheckerIamgeByKarloParams,
  NSFWCheckerIamgeByKarloResponse,
  UpscaleIamgeByKarloParams,
  UpscaleIamgeByKarloResponse,
  VariationsIamgeByKarloParams,
  VariationsIamgeByKarloResponse,
} from '../types/karlo.type';

const apiKey = import.meta.env.VITE_APP_KARLO_API_KEY;

const karloApi = commonAxios({
  baseURL: 'https://api.kakaobrain.com/v2/inference/karlo',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `KakaoAK ${apiKey}`,
  },
});

export const createIamgeByKarlo = (param: CreateIamgeByKarloParams) =>
  karloApi.post<CreateIamgeByKarloResponse>('/t2i', param).then((res) => {
    return res.data;
  });

export const upscaleIamgeByKarlo = (param: UpscaleIamgeByKarloParams) => karloApi.post<UpscaleIamgeByKarloResponse>('/upscale', param).then((res) => res.data);

export const variationsIamgeByKarlo = (param: VariationsIamgeByKarloParams) =>
  karloApi.post<VariationsIamgeByKarloResponse>('/variations', param).then((res) => res.data);

export const nsfwIamgeByKarlo = (param: NSFWCheckerIamgeByKarloParams) => karloApi.post<NSFWCheckerIamgeByKarloResponse>('/variations', param);
