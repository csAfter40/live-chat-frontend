import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MainStack from "./components/navigators/MainStack";
import useGlobal from "./global";

SplashScreen.preventAutoHideAsync();

function Root() {
	return (
		<NavigationContainer>
			<MainStack />
			<StatusBar style="auto" />
		</NavigationContainer>
	);
}

export default function App() {
	const initialized = useGlobal((state) => state.initialized);
	const init = useGlobal((state) => state.init);
	const [fontsLoaded, fontsError] = useFonts({
		"Lobster-Regular": require("./assets/fonts/Lobster-Regular.ttf"),
	});
	React.useLayoutEffect(() => {
		const hideSplash = async () => {
			await SplashScreen.hideAsync();
		};
		console.log(initialized, fontsLoaded);
		if (fontsLoaded || fontsError) {
			if (!initialized) {
				init();
			} else {
				hideSplash();
			}
		}
	}, [fontsLoaded, fontsError, initialized]);

	if (!fontsLoaded && !fontsError) {
		return null;
	}
	return (
		<PaperProvider>
			<Root />
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
