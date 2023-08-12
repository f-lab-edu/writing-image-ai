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
import { kakoApi } from './axios.config';

const karloUrl = '/v2/inference/karlo';
export const createIamgeByKarlo = (param: CreateIamgeByKarloParams) =>
  kakoApi.post<CreateIamgeByKarloResponse>(karloUrl + '/t2i', param).then((res) => {
    return res.data;
  });

export const upscaleIamgeByKarlo = (param: UpscaleIamgeByKarloParams) =>
  kakoApi.post<UpscaleIamgeByKarloResponse>(karloUrl + '/upscale', param).then((res) => res.data);

export const variationsIamgeByKarlo = (param: VariationsIamgeByKarloParams) =>
  kakoApi.post<VariationsIamgeByKarloResponse>(karloUrl + '/variations', param).then((res) => res.data);

export const nsfwIamgeByKarlo = (param: NSFWCheckerIamgeByKarloParams) => kakoApi.post<NSFWCheckerIamgeByKarloResponse>(karloUrl + '/variations', param);
