import { Text, StyleSheet } from "react-native";
import React from "react";
import Page from "../components/Page";

export default function SignIn() {
	return (
		<Page style={styles.page}>
			<Text>SignIn</Text>
		</Page>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
});
