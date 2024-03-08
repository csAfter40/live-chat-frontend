import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import React from "react";
import { useTheme } from "react-native-paper";

export default function SelfMessageListItem({ message }) {
	const theme = useTheme();
	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "flex-end",
			width: "100%",
			marginVertical: 2,
		},
		bubble: {
			maxWidth: "75%",
			padding: 5,
			paddingHorizontal: 10,

			borderRadius: 10,
			margin: 3,
			backgroundColor: theme.colors.primary,
		},
		bubbleText: {
			color: theme.colors.onPrimary,
		},
	});
	return (
		<View style={styles.container}>
			<Surface style={styles.bubble}>
				<Text style={styles.bubbleText}>{message.text}</Text>
			</Surface>
		</View>
	);
}
