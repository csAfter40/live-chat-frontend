import { Text, StyleSheet } from "react-native";
import React from "react";
import Page from "../components/Page";

export default function Home() {
	return (
		<Page style={styles.page}>
			<Text>Home</Text>
		</Page>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
});
