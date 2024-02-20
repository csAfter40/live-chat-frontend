import { Text, StyleSheet } from "react-native";
import React from "react";
import Page from "../components/Page";

export default function Messages() {
	return (
		<Page style={styles.page}>
			<Text>Messages</Text>
		</Page>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
});
