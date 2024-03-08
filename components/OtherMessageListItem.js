import { StyleSheet, View } from "react-native";
import { Surface, Avatar, Text } from "react-native-paper";
import React from "react";
import { getThumbnail } from "../utils";
import { useTheme } from "react-native-paper";

export default function OtherMessageListItem({ message, friend }) {
	const theme = useTheme();
	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "flex-start",
			justifyContent: "flex-start",
			gap: 5,
			width: "100%",
			marginVertical: 2,
		},
		bubble: {
			maxWidth: "75%",
			padding: 5,
			paddingHorizontal: 10,
			borderRadius: 10,
			marginVertical: 3,
			backgroundColor: theme.colors.secondary,
		},
		bubbleText: {
			color: theme.colors.onSecondary,
		},
	});
	return (
		<View style={styles.container}>
			<Avatar.Image
				style={{ marginTop: 2 }}
				size={28}
				source={getThumbnail(friend.thumbnail)}
			/>
			<Surface style={styles.bubble}>
				<Text style={styles.bubbleText}>{message.text}</Text>
			</Surface>
		</View>
	);
}
