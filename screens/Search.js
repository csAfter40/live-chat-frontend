import { Text, StyleSheet } from "react-native";
import React from "react";
import Page from "../components/Page";
import { Searchbar, Divider } from "react-native-paper";
import Message from "../components/Message";

export default function Search() {
	const [results, setResults] = React.useState([]);
	const [searchQuery, setSearchQuery] = React.useState("");
	return (
		<Page style={styles.page}>
			<Searchbar
				placeholder="Search..."
				onChangeText={setSearchQuery}
				value={searchQuery}
			/>
			<Divider style={{ width: "100%", margin: 20 }} />
			<Message message={"No results found"} />
		</Page>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "flex-start",
		alignItems: "center",
	},
});
