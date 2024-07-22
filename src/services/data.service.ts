import getConfig from "next/config";
import { RegisterProps } from "@/types/data";
import {fetchWrapper } from "../helpers/index"


const { publicRuntimeConfig } = getConfig();
const baseUrl = `http://127.0.0.1:8000`;


const getAll = () => {
    return fetchWrapper.get(`${baseUrl}/get/`);
  };

const postData = ({ name, description }: { name: string, description: string }) => {
    return fetchWrapper.post(`${baseUrl}/post/`, { name, description });
  };

const register = (data: RegisterProps) => {
  return fetchWrapper.post(`${baseUrl}/register/`, data);
};

const login = ({emailID, password}: {emailID: string; password: string}) => {
  return fetchWrapper.post(`${baseUrl}/login/`, {emailID, password});
};

 



export const dataService = {
    getAll,
    postData,
    register,
    login,
};
  
