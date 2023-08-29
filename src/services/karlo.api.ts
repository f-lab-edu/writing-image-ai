import {
  type CreateIamgeByKarloParams,
  type CreateIamgeByKarloResponse,
  type UpscaleIamgeByKarloParams,
  type UpscaleIamgeByKarloResponse,
  type VariationsIamgeByKarloParams,
  type VariationsIamgeByKarloResponse,
} from '../types/karlo.type';
import { kakoApi } from './axios.config';

const _karloUrl = '/v2/inference/karlo';

export const createIamgeByKarlo = async (param: CreateIamgeByKarloParams) =>
  await kakoApi.post<CreateIamgeByKarloResponse>(`${_karloUrl}/t2i`, param).then((res) => {
    return res.data;
  });

export const upscaleIamgeByKarlo = async (param: UpscaleIamgeByKarloParams) =>
  await kakoApi.post<UpscaleIamgeByKarloResponse>(`${_karloUrl}/upscale`, param).then((res) => res.data);

export const variationsIamgeByKarlo = async (param: VariationsIamgeByKarloParams) =>
  await kakoApi.post<VariationsIamgeByKarloResponse>(`${_karloUrl}/variations`, param).then((res) => res.data);
