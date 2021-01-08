import axios from "axios";
import { server } from "./keys";

export const userInstance = axios.create({
  baseURL: server,
  withCredentials: true,
  headers: {
    Authorization: localStorage.getItem("accessToken")
      ? "Bearer" + " " + localStorage.getItem("accessToken")
      : "",
  },
});
