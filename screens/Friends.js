import { Text, StyleSheet } from "react-native";
import React from "react";
import BottomNavPage from "../components/BottomNavPage";

export default function Friends() {
	return (
		<BottomNavPage style={styles.page} title="Friends">
			<Text>Friendss</Text>
		</BottomNavPage>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
});
