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
function responseMessageType(set, get, data) {
	const connection = get().currentConnection;
	if (data.username !== connection?.friend.username) return;
	set((state) => ({
		messagesTyping: new Date(),
	}));
}
function responseMessageSend(set, get, data) {
	// update connection preview
	const user = get().user;
	let friend;
	if (data.sender.username === user.username) {
		friend = data.receiver;
	} else {
		friend = data.sender;
	}
	const friends = [...get().friendsList];
	const friendIndex = friends.findIndex(
		(item) => item.friend.username === friend.username
	);
	if (friendIndex > -1) {
		let connection = friends.splice(friendIndex, 1)[0];
		connection.preview = data.text;
		connection.updated = data.created;
		friends.unshift(connection);
		set((state) => ({
			friendsList: friends,
		}));
	}
	if (!get().currentConnection) return;
	if (friend.username != get().currentConnection.friend.username) {
		// if message is not from the current friend, don't update the messages
		return;
	}
	set((state) => ({
		messages: [data, ...get().messages],
		messagesTyping: null,
	}));
}
function responseMessageList(set, get, data) {
	set((state) => ({
		messages: [...get().messages, ...data],
	}));
}
function responseFriendList(set, get, data) {
	set((state) => ({
		friendsList: data,
	}));
}
function responseFriendNew(set, get, friend) {
	const friends = get().friendsList;
	set((state) => ({
		friendsList: [friend, ...friends],
	}));
}
function responseRequestList(set, get, data) {
	set((state) => ({
		requestsList: data,
	}));
}

function responseRequestAccept(set, get, data) {
	// console.log(data);
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
				"friend.new": responseFriendNew,
				"message.list": responseMessageList,
				"message.send": responseMessageSend,
				"message.type": responseMessageType,
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
	// Message
	messages: [],
	messageSend: (connectionId, messageText) => {
		const socket = get().socket;
		socket.send(
			JSON.stringify({
				source: "message.send",
				messageText: messageText,
				connectionId: connectionId,
			})
		);
	},
	messageType: (username) => {
		const socket = get().socket;
		socket.send(
			JSON.stringify({
				source: "message.type",
				username: username,
			})
		);
	},
	messagesTyping: null,
	messageList: (connectionId, page = 0) => {
		if (page === 0) {
			set((state) => ({
				messages: [],
				messagesTyping: null,
			}));
		}
		const socket = get().socket;
		socket.send(
			JSON.stringify({
				source: "message.list",
				page: page,
				connectionId: connectionId,
			})
		);
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
	currentConnection: null,
	setCurrentConnection: (connection) => {
		set((state) => ({
			currentConnection: connection,
		}));
	},

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
