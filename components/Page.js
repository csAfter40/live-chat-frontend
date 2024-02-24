import {
	StyleSheet,
	View,
	Keyboard,
	Pressable,
	KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

export default function Page({ children, style }) {
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
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
			<Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
				<View style={[styles.page, style]}>{children}</View>
			</Pressable>
		</KeyboardAvoidingView>
	);
}
