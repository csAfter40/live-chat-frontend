import React from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import useGlobal from "../global";
import { getThumbnail } from "../utils";

export default function TopBar({
	title,
	navigation,
	route,
	options,
	back,
	showSearch,
	showAvatar,
}) {
	const user = useGlobal((state) => state.user);
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
					source={getThumbnail(user.thumbnail)}
					style={{ marginLeft: 12 }}
				/>
			)}
			<Appbar.Content title={barTitle} />
			{showSearch && <Appbar.Action icon="magnify" onPress={handleSearch} />}
		</Appbar.Header>
	);
}
