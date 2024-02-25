import { create } from "zustand";
import secure from "./secure";

const useGlobal = create((set) => ({
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
