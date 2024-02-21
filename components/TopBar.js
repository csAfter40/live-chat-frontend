import React from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";

export default function TopBar({ title, navigation, route, options, back }) {
	const barTitle = title || getHeaderTitle(options, route.name);
	return (
		<Appbar.Header elevated={true} mode="center-aligned">
			{back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
			<Appbar.Content title={barTitle} />
		</Appbar.Header>
	);
}
