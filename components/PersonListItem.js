import React from "react";
import { View } from "react-native";
import { List, Avatar, Divider, Text, Icon } from "react-native-paper";
import { getThumbnail } from "../utils";
import ListItemAction from "./ListItemAction";
import useGlobal from "../global";

export default function PersonListItem({ person }) {
	const data = {};
	const requestConnect = useGlobal((state) => state.requestConnect);
	switch (person.status) {
		case "not-connected":
			data.text = "Connect";
			data.onPress = () => requestConnect(person.username);
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
						<View style={{ alignSelf: "center" }}>
							<Icon
								source="checkbox-marked-circle"
								color="green"
								size={40}
							/>
						</View>
					) : (
						<ListItemAction data={data} username={person.username} />
					)
				}
			/>
			<Divider />
		</>
	);
}
