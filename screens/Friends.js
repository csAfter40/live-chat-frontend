import { StyleSheet } from "react-native";
import React from "react";
import BottomNavPage from "../components/BottomNavPage";
import useGlobal from "../global";
import LoadingOverlay from "./LoadingOverlay";
import Message from "../components/Message";
import FriendList from "../components/FriendList";

export default function Friends() {
	const friends = useGlobal((state) => state.friendsList);
	// if (friendsList === null) {
	// 	return (
	// 		<BottomNavPage style={styles.page} title={"Friends"}>
	// 			<LoadingOverlay />
	// 		</BottomNavPage>
	// 	);
	// }
	return (
		<BottomNavPage style={styles.page} title={"Friends"}>
			{friends === null ? (
				<LoadingOverlay />
			) : friends.length === 0 ? (
				<Message message="No connections available" />
			) : (
				<FriendList friends={friends} />
			)}
		</BottomNavPage>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
});
