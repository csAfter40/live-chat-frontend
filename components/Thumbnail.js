import { View, StyleSheet, Image } from "react-native";
import { IconButton } from "react-native-paper";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import useGlobal from "../global";
import { getThumbnail } from "../utils";

export default function Thumbnail() {
	const uploadThumbnail = useGlobal((state) => state.uploadThumbnail);
	const deleteThumbnail = useGlobal((state) => state.deleteThumbnail);
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
		uploadThumbnail(file);
	}
	function handleImageDelete() {
		deleteThumbnail();
	}
	return (
		<View>
			<Image style={styles.image} source={getThumbnail(user.thumbnail)} />
			<IconButton
				style={[styles.editButton, { borderColor: theme.colors.background }]}
				icon="pencil"
				containerColor={theme.colors.secondaryContainer}
				iconColor={theme.colors.secondary}
				size={25}
				onPress={handleImagePick}
				mode="outlined"
			/>
			<IconButton
				style={[styles.deleteButton, { borderColor: theme.colors.background }]}
				icon="trash-can-outline"
				containerColor={theme.colors.errorContainer}
				iconColor={theme.colors.error}
				size={25}
				onPress={handleImageDelete}
				mode="outlined"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 180,
		height: 180,
		borderRadius: 90,
		marginBottom: 20,
	},
	editButton: {
		position: "absolute",
		bottom: 0,
		right: 0,
		borderWidth: 4,
	},
	deleteButton: {
		position: "absolute",
		top: -15,
		right: 0,
		borderWidth: 4,
	},
});
