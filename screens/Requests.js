import { Text, StyleSheet } from "react-native";
import React from "react";
import BottomNavPage from "../components/BottomNavPage";

export default function Requests() {
	return (
		<BottomNavPage style={styles.page} title={"Requests"}>
			<Text>Requests</Text>
		</BottomNavPage>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
});
