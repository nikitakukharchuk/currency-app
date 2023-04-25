import axios from "../../../node_modules/axios/index";

const API_URL = 'http://localhost:3000/api/v1';

export const instance = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
});