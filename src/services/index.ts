import axios from "axios";
import type { AxiosRequestConfig } from "axios";

import { ACCESS_TOKEN } from "@/constants";

interface RequestOptions {
  baseURL?: string;
  endpoint: string;
  isShowError?: boolean;
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
  method?: "GET" | "PUT" | "POST" | "PATCH" | "DELETE";
}

const apiClient = async ({
  body,
  query,
  baseURL,
  headers,
  endpoint,
  method = "GET",
  isShowError = true,
}: RequestOptions) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  const options: AxiosRequestConfig = {
    method,
    url: endpoint,
    baseURL: baseURL || process.env.REACT_APP_API_BASE_URL,
    headers: headers || { "Content-Type": "application/json" },
  };

  if (body) options.data = body;
  if (query) options.params = query;
  if (token) options.headers = { ...options.headers, Authorization: token };

  const res = await axios(options).catch((err) => {

    if (isShowError) throw new Error(err.message);

    return { data: null }
  });

  return res.data;
};

export default apiClient;
