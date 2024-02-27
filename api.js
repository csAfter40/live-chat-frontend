import axios from "axios";

export const ADDRESS = "192.168.1.105:8000";

const axiosInstance = axios.create({
	baseURL: `http://${ADDRESS}`,
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosInstance;
