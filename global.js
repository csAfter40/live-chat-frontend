import { create } from "zustand";
import secure from "./secure";
import axiosInstance from "./api";

const useGlobal = create((set) => ({
	// Initialization
	initialized: false,
	init: async () => {
		const credentials = JSON.parse(await secure.retrieveKey("credentials"));
		try {
			if (credentials) {
				const response = await axiosInstance.post("/chat/signin/", credentials);
				if (res.status !== 200) {
					throw "Authentication error";
				}
				const user = res.data.user;
				set((state) => ({
					isAuthenticated: true,
					user: user,
				}));
			}
		} catch (error) {
			console.log(error);
		} finally {
			set((state) => ({
				initialized: true,
			}));
		}
	},

	// Authentication
	isAuthenticated: false,
	user: null,
	login: (credentials, user) => {
		secure.storeKey("credentials", JSON.stringify(credentials));
		set((state) => ({
			isAuthenticated: true,
			user: user,
		}));
	},
	logout: () => {
		secure.removeKey("credentials");
		set((state) => ({
			isAuthenticated: false,
			user: null,
		}));
	},
	// Spinner
	spinnerVisible: false,
	startSpinner: () => set((state) => ({ spinnerVisible: true })),
	stopSpinner: () => set((state) => ({ spinnerVisible: false })),
}));

export default useGlobal;
