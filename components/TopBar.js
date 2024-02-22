import React from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

export default function TopBar({
	title,
	navigation,
	route,
	options,
	back,
	showSearch,
	showAvatar,
}) {
	const navigator = navigation || useNavigation();
	const barTitle = title || getHeaderTitle(options, route.name);
	function handleSearch() {
		navigator.navigate("Search");
	}
	return (
		<Appbar.Header elevated={true} mode="center-aligned">
			{back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
			{showAvatar && (
				<Avatar.Image
					size={24}
					source={require("../assets/images/user-avatar.jpg")}
					style={{ marginLeft: 12 }}
				/>
			)}
			<Appbar.Content title={barTitle} />
			{showSearch && <Appbar.Action icon="magnify" onPress={handleSearch} />}
		</Appbar.Header>
	);
}
