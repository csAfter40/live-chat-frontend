import React from "react";
import { View } from "react-native";
import FriendListItem from "./FriendListItem";
import { FlashList } from "@shopify/flash-list";

export default function FriendList({ friends }) {
	return (
		<View style={{ flex: 1, width: "100%" }}>
			<FlashList
				data={friends}
				renderItem={({ item }) => <FriendListItem friendData={item} />}
				keyExtractor={(item) => item.id}
				estimatedItemSize={50}
			/>
		</View>
	);
}
