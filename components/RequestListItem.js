import React from "react";
import { List, Avatar, Divider, Text, Button } from "react-native-paper";
import { getThumbnail } from "../utils";
import useGlobal from "../global";

export default function RequestListItem({ person }) {
	const time = "7m ago";
	function handleAccept() {
		console.log(`accept request from ${person.username}`);
	}
	return (
		<>
			<List.Item
				title={person.full_name}
				left={() => (
					<Avatar.Image size={50} source={getThumbnail(person.thumbnail)} />
				)}
				description={() => <Text>{time}</Text>}
				right={() => (
					<Button
						style={{ alignSelf: "center" }}
						mode="contained-tonal"
						onPress={handleAccept}
					>
						Accept
					</Button>
				)}
			/>
			<Divider />
		</>
	);
}
