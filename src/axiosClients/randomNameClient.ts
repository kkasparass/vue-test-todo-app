import { ClientResponse } from "@/types/types";
import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "https://randomuser.me",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getName: (props: AxiosRequestConfig = {}) =>
    apiClient.get<ClientResponse>("/api", { ...props }),
};
