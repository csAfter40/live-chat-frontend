import React from "react";
import { List, Avatar, Divider, Text, Button } from "react-native-paper";
import { getThumbnail } from "../utils";
import useGlobal from "../global";

export default function FriendListItem({ friendData }) {
	const friend = friendData.friend;
	return (
		<>
			<List.Item
				title={friend.full_name}
				left={() => (
					<Avatar.Image size={50} source={getThumbnail(friend.thumbnail)} />
				)}
				// description={() => <Text>{time}</Text>}
				// right={() => (
				// 	<Button
				// 		style={{ alignSelf: "center" }}
				// 		mode="contained-tonal"
				// 		onPress={handleAccept}
				// 	>
				// 		Accept
				// 	</Button>
				// )}
			/>
			<Divider />
		</>
	);
}
