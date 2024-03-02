import { StyleSheet } from "react-native";
import React from "react";
import BottomNavPage from "../components/BottomNavPage";
import useGlobal from "../global";
import LoadingOverlay from "./LoadingOverlay";
import Message from "../components/Message";
import RequestList from "../components/RequestList";

export default function Requests() {
	const requestsList = useGlobal((state) => state.requestsList);
	console.log("requsets list: ", requestsList);
	if (requestsList === null) {
		return (
			<BottomNavPage style={styles.page} title={"Requests"}>
				<LoadingOverlay />
			</BottomNavPage>
		);
	}
	return (
		<BottomNavPage style={styles.page} title={"Requests"}>
			{requestsList === null ? (
				<LoadingOverlay />
			) : requestsList.length === 0 ? (
				<Message message="You currently don't have any friend requests." />
			) : (
				<RequestList requests={requestsList} />
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
