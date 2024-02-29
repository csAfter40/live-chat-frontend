import { View, StyleSheet } from "react-native";
import React from "react";
import { Text, Icon } from "react-native-paper";
import { useTheme } from "react-native-paper";

export default function Message({ message, style, textStyle, icon }) {
	const theme = useTheme();
	return (
		<View style={[styles.container, style]}>
			<Icon
				source={icon || "alert-rhombus"}
				color={theme.colors.secondary}
				size={60}
			/>
			<Text style={[styles.text, { color: theme.colors.secondary }, textStyle]}>
				{message}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "flex-start",
		borderRadius: 8,
		height: 40,
		padding: 30,
	},
	text: {
		marginTop: 10,
	},
});
