import React from "react";
import { View } from "react-native";
import { List, Avatar, Divider, Text } from "react-native-paper";
import { getThumbnail } from "../utils";
import { formatTime } from "../utils";
import { useNavigation } from "@react-navigation/native";

export default function FriendListItem({ friendData }) {
	const navigation = useNavigation();
	const friend = friendData.friend;
	return (
		<>
			<List.Item
				onPress={() => navigation.navigate("Messages", friendData)}
				title={friend.full_name}
				left={() => (
					<Avatar.Image size={50} source={getThumbnail(friend.thumbnail)} />
				)}
				description={() => <Text>{friendData.preview}</Text>}
				right={() => (
					<Text style={{ alignSelf: "center", color: "#707070" }}>
						{formatTime(friendData.updated)}
					</Text>
				)}
			/>
			<Divider />
		</>
	);
}
