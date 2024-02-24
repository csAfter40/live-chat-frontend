import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../../screens/SignIn";
import SignUp from "../../screens/SignUp";
import Home from "../../screens/Home";
import Search from "../../screens/Search";
import Messages from "../../screens/Messages";
import TopBar from "../TopBar";
import useGlobal from "../../global";
import GlobalSpinner from "../GlobalSpinner";

const Stack = createNativeStackNavigator();

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				animation: "slide_from_right",
				contentStyle: { backgroundColor: null },
			}}
		>
			<Stack.Screen
				name="SignIn"
				component={SignIn}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="SignUp"
				component={SignUp}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
function AuthenticatedStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: "center",
				animation: "slide_from_right",
				header: (props) => <TopBar {...props} />,
				contentStyle: { backgroundColor: null },
			}}
		>
			<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
			<Stack.Screen name="Search" component={Search} />
			<Stack.Screen name="Messages" component={Messages} />
		</Stack.Navigator>
	);
}

export default function MainStack() {
	const isAuthenticated = useGlobal((state) => state.isAuthenticated);
	const spinnerVisible = useGlobal((state) => state.spinnerVisible);
	return (
		<>
			{isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
			{spinnerVisible && <GlobalSpinner />}
		</>
	);
}
