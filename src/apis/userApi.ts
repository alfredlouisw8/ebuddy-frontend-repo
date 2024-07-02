import { User } from "@/types";
import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const fetchAllUsers = async () => {
	const response = await api.get("/fetch-user-data");
	return response.data;
};

export const updateUserData = async (userData: User) => {
	const response = await api.put(`/update-user-data/${userData.id}`, userData);
	return response.data;
};
