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

export const karloApi = axios.create({
  baseURL: "https://api.kakaobrain.com/v2/inference/karlo",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.KARLO_API_KEY}`,
  },
});

export const createIamgeByKarlo = (param: CreateIamgeByKarloParams) =>
  karloApi.post<CreateIamgeByKarloResponse>("/t2i", {
    param,
  });

export const upscaleIamgeByKarlo = (param: UpscaleIamgeByKarloParams) =>
  karloApi.post<UpscaleIamgeByKarloResponse>("/upscale", {
    param,
  });

export const variationsIamgeByKarlo = (param: VariationsIamgeByKarloParams) =>
  karloApi.post<VariationsIamgeByKarloResponse>("/variations", {
    param,
  });

export const nsfwIamgeByKarlo = (param: NSFWCheckerIamgeByKarloParams) =>
  karloApi.post<NSFWCheckerIamgeByKarloResponse>("/variations", {
    param,
  });
