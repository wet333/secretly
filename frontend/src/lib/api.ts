import axios, {Axios} from "axios";
import {API_ADMIN_PASSWORD, API_ADMIN_USERNAME, API_URL_DEV} from "./constants.ts";

const API: Axios = axios.create({
    baseURL: API_URL_DEV,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Apply the auth header to all requests
API.defaults.headers.common['Authorization'] = `Basic ${btoa(API_ADMIN_USERNAME + ":" + API_ADMIN_PASSWORD)}`;

export default API;