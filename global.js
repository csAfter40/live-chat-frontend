import { create } from "zustand";

const useGlobal = create((set) => ({
	// Authentication
	isAuthenticated: false,
	user: null,
	login: (user) => {
		set((state) => ({
			isAuthenticated: true,
			user: user,
		}));
	},
	logout: () => {
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
