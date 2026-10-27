import axios from "axios";

const isServer = typeof window === "undefined";
const API_BASE_URL = isServer 
  ? "http://backend:46329" 
  : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:46329");

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});