import { create } from "zustand";
import secure from "./secure";
import axiosInstance from "./api";
import { ADDRESS } from "./api";


// Socket receive message handlers
function responseThumbnail(set, get, data) {
	set((state)=>({
		user: data
	}))
}

function responseSearch(set, get, data) {
	set((state) => ({
		searchResults: data,
	}));
}
function responseFriendList(set, get, data) {
	set((state) => ({
		friendsList: data,
	}));
}
function responseRequestList(set, get, data) {
	set((state) => ({
		requestsList: data,
	}));
}

function responseRequestAccept(set, get, data) {
	console.log(data);
	// set((state) => ({
	// 	requestsList: data,
	// }));
}

function responseRequestConnection(set, get, connection) {
	const user = get().user;
	// if I am the one who sent connect request:
	if (user.username === connection.sender.username) {
		const searchResults = get().searchResults;
		const newList = searchResults.map((person) => {
			if (person.username === connection.receiver.username) {
				return { ...person, status: "pending-them" };
			} else {
				return person;
			}
		});
		set((state) => ({
			searchResults: newList,
		}));
	} else {
		// If I receive a connect request
		const newRequestList = [...get().requestsList];
		newRequestList.unshift(connection);
		set((state) => ({
			requestsList: newRequestList,
		}));
	}
}

const useGlobal = create((set, get) => ({
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
			console.log("socket opened");
			// get requests
			socket.send(
				JSON.stringify({
					source: "request.list",
				})
			);
			// get friends
			socket.send(
				JSON.stringify({
					source: "friend.list",
				})
			);
		};
		socket.onmessage = (event) => {
			// this is where we recieve incoming messages
			const responses = {
				thumbnail: responseThumbnail,
				search: responseSearch,
				"request.connect": responseRequestConnection,
				"request.list": responseRequestList,
				"request.accept": responseRequestAccept,
				"friend.list": responseFriendList,
			};
			const parsedData = JSON.parse(event.data);
			const response = responses[parsedData.source];
			if (!response) {
				console.log("Unable to find data source.");
				return;
			}
			response(set, get, parsedData.data);
		};
		socket.onerror = (err) => {
			console.log("socket error", err);
		};
		socket.onclose = () => {
			console.log("socket closed");
		};
		set((state) => ({
			socket: socket,
		}));
	},
	socketClose: () => {
		const socket = get().socket;
		if (socket) {
			socket.close();
		}
		set((state) => ({
			socket: null,
		}));
	},
	// Search
	searchResults: null,

	searchUser: (query) => {
		if (query) {
			const socket = get().socket;
			socket.send(
				JSON.stringify({
					source: "search",
					query: query,
				})
			);
		} else {
			set((state) => ({
				searchResults: null,
			}));
		}
	},
	// Friends
	friendsList: null,

	// Requests
	requestsList: null,

	requestConnect: (username) => {
		const socket = get().socket;
		socket.send(
			JSON.stringify({
				source: "request.connect",
				username: username,
			})
		);
	},

	requestAccept: (id) => {
		const socket = get().socket;
		socket.send(
			JSON.stringify({
				source: "request.accept",
				id: id,
			})
		);
	},

	// Thumbnail
	uploadThumbnail: (file) => {
		const socket = get().socket;
		socket.send(
			JSON.stringify({
				source: "thumbnail",
				base64: file.base64,
				filename: file.fileName,
			})
		);
	},
	deleteThumbnail: () => {
		const socket = get().socket;
		socket.send(
			JSON.stringify({
				source: "thumbnail",
				base64: null,
				filename: null,
			})
		);
	},
}));

export default useGlobal;
