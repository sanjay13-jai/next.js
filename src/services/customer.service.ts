// user.service.ts

import { convertBodyJsonStringify, fetchWrapper } from "@/helpers/fetch-wrapper";
import { localStorageUtils } from "@/helpers/utils/local-storage";
import { userSubject } from "@/helpers/utils/user-subject";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BottomMeasurements, CustomerProps, TopMeasurements } from "@/types/customer";
import getConfig from "next/config";
import { removeCookie, setCookie } from "tiny-cookie";

// const baseUrl = 'http://127.0.0.1:8000';
const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.backendApiUrl;


const getCustomerData = (data: any) => {
  return fetchWrapper.post(`${baseUrl}/create-customer`, {
    body: convertBodyJsonStringify(data),
  });
};

// const getTopMeasurements = (data: TopMeasurements) => {
//   return fetchWrapper.post(`${baseUrl}/top-measurements`, {
//     body: convertBodyJsonStringify(data),
//   });
// };

// const getBottomMeasurements = (data: BottomMeasurements) => {
//   return fetchWrapper.post(`${baseUrl}/bottom-measurements`, {
//     body: convertBodyJsonStringify(data),
//   });
// };

export const CustomerService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getCustomerData,
  // getTopMeasurements,
  // getBottomMeasurements,
};
