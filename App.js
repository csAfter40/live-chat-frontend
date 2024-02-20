import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./components/navigators/MainStack";
import { AuthProvider } from "./providers/AuthProvider";
import { SpinnerProvider } from "./providers/SpinnerProvider";

function Root() {
	return (
		<NavigationContainer>
			<MainStack />
			<StatusBar style="auto" />
		</NavigationContainer>
	);
}

export default function App() {
	return (
		<SpinnerProvider>
			<PaperProvider>
				<AuthProvider>
					<Root />
				</AuthProvider>
			</PaperProvider>
		</SpinnerProvider>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
