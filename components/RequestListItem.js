import React from "react";
import { List, Avatar, Divider, Text, Button } from "react-native-paper";
import { getThumbnail } from "../utils";
import useGlobal from "../global";

export default function RequestListItem({ request }) {
	const requestAccept = useGlobal((state) => state.requestAccept);
	const time = "7m ago";
	function handleAccept() {
		requestAccept(request.id);
	}
	return (
		<>
			<List.Item
				title={request.sender.full_name}
				left={() => (
					<Avatar.Image
						size={50}
						source={getThumbnail(request.sender.thumbnail)}
					/>
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
