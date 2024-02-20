import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../../screens/SignIn";
import SignUp from "../../screens/SignUp";
import Home from "../../screens/Home";
import Search from "../../screens/Search";
import Messages from "../../screens/Messages";
import LoadingOverlay from "../../screens/LoadingOverlay";
import { AuthContext } from "../../providers/AuthProvider";

const Stack = createNativeStackNavigator();

function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="SignUp" component={SignUp} />
		</Stack.Navigator>
	);
}
function AuthenticatedStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Search" component={Search} />
			<Stack.Screen name="Messages" component={Messages} />
		</Stack.Navigator>
	);
}

export default function MainStack() {
	const { isAuthenticated } = React.useContext(AuthContext);
	return <>{isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}</>;
}
