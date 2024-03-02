import React from "react";
import { View } from "react-native";
import RequestListItem from "./RequestListItem";
import { FlashList } from "@shopify/flash-list";

export default function RequestList({ requests }) {
	return (
		<View style={{ flex: 1, width: "100%" }}>
			<FlashList
				data={requests}
				renderItem={({ item }) => <RequestListItem request={item} />}
				keyExtractor={(item) => item.id}
				estimatedItemSize={50}
			/>
		</View>
	);
}
