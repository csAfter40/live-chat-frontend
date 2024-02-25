import { StyleSheet, Image } from "react-native";
import React from "react";
import BottomNavPage from "../components/BottomNavPage";
import { Button, Text, useTheme } from "react-native-paper";
import useGlobal from "../global";

export default function Profile() {
	theme = useTheme();
	const logout = useGlobal((state) => state.logout);
	const user = useGlobal((state) => state.user);
	return (
		<BottomNavPage style={styles.page} title={"Profile"}>
			<Image
				style={styles.image}
				source={require("../assets/images/user-avatar.jpg")}
			/>
			<Text variant="titleLarge">{user.full_name}</Text>
			<Text variant="bodyLarge">@{user.username}</Text>
			<Button
				icon="logout"
				style={styles.button}
				buttonColor={theme.colors.secondary}
				mode="contained"
				onPress={logout}
			>
				Log Out
			</Button>
		</BottomNavPage>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 180,
		height: 180,
		borderRadius: 90,
		marginBottom: 20,
	},
	button: {
		marginTop: 30,
	},
});
