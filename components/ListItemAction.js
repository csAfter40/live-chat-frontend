import React from "react";
import { Button } from "react-native-paper";

export default function ListItemAction({ data }) {
	return (
		<Button
			style={{ alignSelf: "center" }}
			mode="contained-tonal"
			disabled={data.disabled}
			onPress={data.onPress}
		>
			{data.text}
		</Button>
	);
}
