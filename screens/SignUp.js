import { Text, StyleSheet } from "react-native";
import React from "react";
import Page from "../components/Page";

export default function SignUp() {
	return (
		<Page style={styles.page}>
			<Text>SignUp</Text>
		</Page>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
});
