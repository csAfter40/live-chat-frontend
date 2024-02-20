import { Portal, ActivityIndicator } from "react-native-paper";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function GlobalSpinner() {
	return (
		<Portal>
			<View style={styles.container}>
				<ActivityIndicator animating={true} size="large" />
			</View>
		</Portal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#00000030",
	},
});
