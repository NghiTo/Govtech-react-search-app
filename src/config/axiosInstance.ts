import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://gist.githubusercontent.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
