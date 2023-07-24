import axios from "axios";
import {
  CreateIamgeByKarloParams,
  CreateIamgeByKarloResponse,
  NSFWCheckerIamgeByKarloParams,
  NSFWCheckerIamgeByKarloResponse,
  UpscaleIamgeByKarloParams,
  UpscaleIamgeByKarloResponse,
  VariationsIamgeByKarloParams,
  VariationsIamgeByKarloResponse,
} from "../types/karlo.type";

const apiKey = import.meta.env.VITE_APP_KARLO_API_KEY;

export const karloApi = axios.create({
  baseURL: "https://api.kakaobrain.com/v2/inference/karlo",
  headers: {
    "Content-Type": "application/json",
    Authorization: `KakaoAK ${apiKey}`,
  },
});

export const createIamgeByKarlo = (param: CreateIamgeByKarloParams) =>
  karloApi.post<CreateIamgeByKarloResponse>("/t2i", param);

export const upscaleIamgeByKarlo = (param: UpscaleIamgeByKarloParams) =>
  karloApi.post<UpscaleIamgeByKarloResponse>("/upscale", param);

export const variationsIamgeByKarlo = (param: VariationsIamgeByKarloParams) =>
  karloApi.post<VariationsIamgeByKarloResponse>("/variations", param);

export const nsfwIamgeByKarlo = (param: NSFWCheckerIamgeByKarloParams) =>
  karloApi.post<NSFWCheckerIamgeByKarloResponse>("/variations", param);
