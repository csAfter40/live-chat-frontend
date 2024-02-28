import { View, StyleSheet } from "react-native";
import React from "react";
import { Text, Icon } from "react-native-paper";
import { useTheme } from "react-native-paper";

export default function Message({ message, style, textStyle, icon }) {
	const theme = useTheme();
	return (
		<View
			style={[styles.container, { color: theme.colors.tertiaryContainer }, style]}
		>
			<Icon
				source={icon || "alert-outline"}
				color={theme.colors.tertiary}
				size={20}
			/>
			<Text style={[styles.text, textStyle]}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "flex-start",
		borderRadius: 4,
	},
	text: {
		marginLeft: 10,
	},
});
