// user.service.ts

import { convertBodyJsonStringify, fetchWrapper } from "@/helpers/fetch-wrapper";
import { localStorageUtils } from "@/helpers/utils/local-storage";
import { userSubject } from "@/helpers/utils/user-subject";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import getConfig from "next/config";
import { removeCookie, setCookie } from "tiny-cookie";

// const baseUrl = 'http://127.0.0.1:8000';
const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.backendApiUrl;


const login = async (emailID: string, password: string) => {
  try {
    const user = await fetchWrapper.post(`${baseUrl}/login`, {
      body: convertBodyJsonStringify({ emailID, password }),
    });
    userSubject.next(user);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const logout = (cb?: () => void) => {
  // const { removeItem } = useLocalStorage();
  const { removeItem } = localStorageUtils();
  userSubject.next(null);
  removeItem("user");
  removeCookie("isLoggedIn");
  removeCookie("emailId");
  removeCookie("token");
  setCookie("isGuest", "1");

  if (cb) {
    cb();
  } else {
    window.location.replace("/login");
  }
};

const logoutService = ({ emailID }: { emailID: string }) => {
  return fetchWrapper.post(`${baseUrl}/logout`, {
    body: convertBodyJsonStringify({ emailID }),
  });
};

const register = (user: Record<string, string>) => {
  return fetchWrapper.post(`${baseUrl}/register`, {
    body: convertBodyJsonStringify(user),
  });
};

const dashboard = ({ emailID }: { emailID: string }) => {
  return fetchWrapper.post(`${baseUrl}/dashboard`, {
    body: convertBodyJsonStringify({ emailID }),
  });
};

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  register,
  dashboard,
  logoutService,
};
