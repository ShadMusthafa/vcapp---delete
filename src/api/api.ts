import axios from "axios";

export const vcpApi = axios.create({
  baseURL: "https://be-invent-dxgx.onrender.com/api",
  headers: {
    "Content-Type": "applicatoin:json",
  },
  withCredentials: true,
});
