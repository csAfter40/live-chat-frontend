import React from "react";
import { List, Avatar, Divider, Text, Icon } from "react-native-paper";
import { getThumbnail } from "../utils";
import ListItemAction from "./ListItemAction";

export default function PersonListItem({ person }) {
	const data = {};
	switch (person.status) {
		case "not-connected":
			data.text = "Connect";
			data.onPress = () => {};
			data.disabled = false;
			break;
		case "pending-them":
			data.text = "Pending";
			data.onPress = () => {};
			data.disabled = true;
			break;
		case "pending-me":
			data.text = "Accept";
			data.onPress = () => {};
			data.disabled = false;
			break;

		default:
			break;
	}
	return (
		<>
			<List.Item
				title={person.full_name}
				left={() => (
					<Avatar.Image size={50} source={getThumbnail(person.thumbnail)} />
				)}
				description={() => <Text>{person.username}</Text>}
				right={() =>
					person.status === "connected" ? (
						<Icon source="checkbox-marked-circle" color="green" size={40} />
					) : (
						<ListItemAction data={data} />
					)
				}
			/>
			<Divider />
		</>
	);
}
