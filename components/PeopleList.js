import React from "react";
import { View } from "react-native";
import PersonListItem from "./PersonListItem";
import { FlashList } from "@shopify/flash-list";

export default function PeopleList({ people }) {
	return (
		<View style={{ flex: 1, width: "100%" }}>
			<FlashList
				data={people}
				renderItem={({ item }) => <PersonListItem person={item} />}
				keyExtractor={(item) => item.username}
				estimatedItemSize={50}
			/>
		</View>
	);
}
