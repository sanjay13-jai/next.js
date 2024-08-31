// fetch-wrapper.ts

import { userService } from "@/services/user.service";

export const convertBodyJsonStringify = (body: any) => {
  return JSON.stringify(body);
};

const get = async (url: string, init?: RequestInit) => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: { ...authHeader(), ...(init?.headers || {}) },
    credentials: "include", // Include cookies
    ...init,
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
};

const post = async (url: string, init?: RequestInit) => {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      ...(init?.headers || {}),
    },
    credentials: "include", // Include cookies
    ...init,
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
};

const put = async (url: string, body: Record<string, any>) => {
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    credentials: "include", // Include cookies
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
};

const _delete = async (url: string) => {
  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: authHeader(),
    credentials: "include", // Include cookies
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
};

// Helper functions

const authHeader = (): HeadersInit => {
  const user = userService.userValue;
  const isLoggedIn = user && user.token;
  return isLoggedIn ? { Authorization: `Bearer ${user.token}` } : {};
};

const handleResponse = async (response: Response) => {
  const isPDF = response.headers.get("content-type") === "application/pdf";
  const res = isPDF ? response.blob() : response.text();

  return res.then((text: any) => {
    if ([401, 403].includes(response.status) && userService.userValue) {
      userService.logout();
    }

    if (!response.ok) {
      const data = !isPDF ? (text && JSON.parse(text)) : null;
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return isPDF ? text : JSON.parse(text);
  }).catch((err) => {
    return Promise.reject(err);
  });
};

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
  convertBodyJsonStringify,
};
