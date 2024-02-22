import { StyleSheet, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import TopBar from "./TopBar";

export default function BottomNavPage({ children, style, title }) {
	const theme = useTheme();
	const styles = StyleSheet.create({
		page: {
			flex: 1,
			padding: 20,
			width: "100%",
			backgroundColor: theme.colors.background,
		},
	});
	return (
		<>
			<TopBar title={title} showSearch={true} showAvatar={true} />
			<View style={[styles.page, style]}>{children}</View>
		</>
	);
}
