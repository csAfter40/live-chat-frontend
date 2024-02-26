import { StyleSheet, Image, View } from "react-native";
import React from "react";
import BottomNavPage from "../components/BottomNavPage";
import { Button, Text, IconButton, useTheme } from "react-native-paper";
import useGlobal from "../global";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
	theme = useTheme();
	const logout = useGlobal((state) => state.logout);
	const user = useGlobal((state) => state.user);
	async function handleImagePick() {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			base64: true,
		});
		if (result.canceled) {
			return;
		}
		const file = result.assets[0];
		console.log(file);
	}
	return (
		<BottomNavPage style={styles.page} title={"Profile"}>
			<View>
				<Image
					style={styles.image}
					source={require("../assets/images/user-avatar.jpg")}
				/>
				<IconButton
					style={[styles.iconButton, { borderColor: theme.colors.background }]}
					icon="pencil"
					containerColor={theme.colors.secondaryContainer}
					iconColor={theme.colors.secondary}
					size={25}
					onPress={handleImagePick}
					mode="outlined"
				/>
			</View>
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
	iconButton: {
		position: "absolute",
		top: 0,
		right: 0,
		borderWidth: 4,
	},
});
