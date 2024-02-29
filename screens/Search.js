import { View, StyleSheet } from "react-native";
import React from "react";
import Page from "../components/Page";
import { Searchbar } from "react-native-paper";
import Message from "../components/Message";
import PeopleList from "../components/PeopleList";
import useGlobal from "../global";

export default function Search() {
	const searchResults = useGlobal((state) => state.searchResults);
	const searchUser = useGlobal((state) => state.searchUser);
	const [searchQuery, setSearchQuery] = React.useState("");
	React.useEffect(() => {
		searchUser(searchQuery);
	}, [searchQuery]);
	return (
		<Page style={styles.page}>
			<Searchbar
				style={styles.searchBar}
				placeholder="Search..."
				onChangeText={setSearchQuery}
				value={searchQuery}
				autoCapitalize="none"
			/>
			{searchResults === null ? (
				<Message icon="magnify" message={"Search for friends"} />
			) : searchResults.length === 0 ? (
				<Message message={`No results found for ${searchQuery}`} />
			) : (
				<PeopleList people={searchResults} />
			)}
		</Page>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "flex-start",
		alignItems: "center",
	},
	searchBar: {
		marginBottom: 20,
	},
});
