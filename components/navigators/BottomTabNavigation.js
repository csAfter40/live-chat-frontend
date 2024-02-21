import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import Friends from "../../screens/Friends";
import Profile from "../../screens/Profile";
import Requests from "../../screens/Requests";

export default function BottomTabNavigation() {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{
			key: "profile",
			title: "Profile",
			focusedIcon: "account-circle",
			unfocusedIcon: "account-circle-outline",
		},
		{
			key: "requests",
			title: "Requests",
			focusedIcon: "bell",
			unfocusedIcon: "bell-outline",
		},
		{
			key: "friends",
			title: "Friends",
			focusedIcon: "account-group",
			unfocusedIcon: "account-group-outline",
		},
	]);

	const renderScene = BottomNavigation.SceneMap({
		friends: Friends,
		requests: Requests,
		profile: Profile,
	});

	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	);
}
