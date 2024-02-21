import { Text, StyleSheet } from "react-native";
import React from "react";
import BottomNavPage from "../components/BottomNavPage";

export default function Profile() {
	return (
		<BottomNavPage style={styles.page} title={"Profile"}>
			<Text>Profile</Text>
		</BottomNavPage>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
});
