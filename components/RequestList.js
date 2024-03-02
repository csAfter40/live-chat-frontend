import React from "react";
import { View } from "react-native";
import RequestListItem from "./RequestListItem";
import { FlashList } from "@shopify/flash-list";

export default function RequestList({ requests }) {
	return (
		<View style={{ flex: 1, width: "100%" }}>
			<FlashList
				data={requests}
				renderItem={({ item }) => <RequestListItem person={item.sender} />}
				keyExtractor={(item) => item.sender.username}
				estimatedItemSize={50}
			/>
		</View>
	);
}
