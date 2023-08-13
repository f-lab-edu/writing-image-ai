import {
  CreateIamgeByKarloParams,
  CreateIamgeByKarloResponse,
  UpscaleIamgeByKarloParams,
  UpscaleIamgeByKarloResponse,
  VariationsIamgeByKarloParams,
  VariationsIamgeByKarloResponse,
} from '../types/karlo.type';
import { kakoApi } from './axios.config';

const _karloUrl = '/v2/inference/karlo';

export const createIamgeByKarlo = (param: CreateIamgeByKarloParams) =>
  kakoApi.post<CreateIamgeByKarloResponse>(`${_karloUrl}/t2i`, param).then((res) => {
    return res.data;
  });

export const upscaleIamgeByKarlo = (param: UpscaleIamgeByKarloParams) =>
  kakoApi.post<UpscaleIamgeByKarloResponse>(`${_karloUrl}/upscale`, param).then((res) => res.data);

export const variationsIamgeByKarlo = (param: VariationsIamgeByKarloParams) =>
  kakoApi.post<VariationsIamgeByKarloResponse>(`${_karloUrl}/variations`, param).then((res) => res.data);
