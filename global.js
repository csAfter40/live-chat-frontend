import { create } from "zustand";
import secure from "./secure";
import axiosInstance from "./api";
import { ADDRESS } from "./api";

const useGlobal = create((set) => ({
	// Initialization
	initialized: false,
	init: async () => {
		const credentials = JSON.parse(await secure.retrieveKey("credentials"));
		try {
			if (credentials) {
				const response = await axiosInstance.post("/chat/signin/", credentials);
				if (response.status !== 200) {
					throw "Authentication error";
				}
				const user = response.data.user;
				const tokens = response.data.tokens;
				secure.storeKey("tokens", JSON.stringify(tokens));
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
	login: (credentials, user, tokens) => {
		secure.storeKey("credentials", JSON.stringify(credentials));
		secure.storeKey("tokens", JSON.stringify(tokens));
		set((state) => ({
			isAuthenticated: true,
			user: user,
		}));
	},
	logout: () => {
		secure.removeKey("credentials");
		secure.removeKey("tokens");
		set((state) => ({
			isAuthenticated: false,
			user: null,
		}));
	},
	// Spinner
	spinnerVisible: false,
	startSpinner: () => set((state) => ({ spinnerVisible: true })),
	stopSpinner: () => set((state) => ({ spinnerVisible: false })),

	// Websocket
	socket: null,
	socketConnect: async () => {
		const tokens = JSON.parse(await secure.retrieveKey("tokens"));
		const socket = new WebSocket(`ws://${ADDRESS}/chat/?token=${tokens.access}`);
		socket.onopen = () => {
			console.log("onopen called");
		};
		socket.onmessage = () => {
			console.log("onmessage called");
		};
		socket.onerror = () => {
			console.log("onerror called");
		};
		socket.onclose = () => {
			console.log("onclose called");
		};
		set((state) => ({
			socket: socket,
		}));
	},
	socketClose: async () => {
		// const tokens = await secure.retrieveKey("tokens")
	},
}));

export default useGlobal;
