import { StyleSheet, View } from "react-native";
import React from "react";
import Page from "../components/Page";
import { Text, TextInput, Button, TouchableRipple } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "react-native-paper";
import axiosInstance from "../api";
import useGlobal from "../global";

export default function SignIn({ navigation }) {
	const login = useGlobal((state) => state.login);
	const startSpinner = useGlobal((state) => state.startSpinner);
	const stopSpinner = useGlobal((state) => state.stopSpinner);
	const theme = useTheme();
	const [hidePassword, setHidePassword] = React.useState(true);
	function togglePasswordView() {
		setHidePassword((prevValue) => !prevValue);
	}
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		mode: "onSubmit",
	});
	function onSubmit(data) {
		startSpinner();
		axiosInstance
			.post("/chat/signin/", data)
			.then((res) => {
				const user = res.data.user;
				const tokens = res.data.tokens;
				const credentials = {
					username: data.username,
					password: data.password,
				};
				login(credentials, user, tokens);
			})
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log("request error");
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log("Error", error.message);
				}
				console.log(error.config);
			})
			.finally(stopSpinner);
	}
	function navigateSignup() {
		navigation.navigate("SignUp");
	}
	return (
		<Page style={styles.page}>
			<Text style={styles.logo}>LiveChat</Text>
			<Controller
				control={control}
				name="username"
				rules={{
					required: "Username is required",
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						label="Username"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						style={styles.input}
						mode="outlined"
						autoCapitalize="none"
					/>
				)}
			/>
			{errors.username && (
				<Text
					variant="labelSmall"
					style={{
						color: theme.colors.error,
						alignSelf: "flex-start",
					}}
				>
					{errors.username.message}
				</Text>
			)}
			<Controller
				control={control}
				name="password"
				rules={{ required: "Password is required" }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						label="Password"
						value={value}
						onChangeText={onChange}
						secureTextEntry={hidePassword}
						onBlur={onBlur}
						style={styles.input}
						mode="outlined"
						right={
							<TextInput.Icon
								onPress={togglePasswordView}
								icon={hidePassword ? "eye" : "eye-off"}
							/>
						}
						autoCapitalize="none"
					/>
				)}
			/>
			{errors.password && (
				<Text
					variant="labelSmall"
					style={{ color: theme.colors.error, alignSelf: "flex-start" }}
				>
					{errors.password.message}
				</Text>
			)}
			<Button
				style={styles.button}
				mode="contained"
				onPress={handleSubmit(onSubmit)}
			>
				Sign In
			</Button>
			<View style={styles.textContainer}>
				<Text>Don't have an account? </Text>
				<Text style={{ color: theme.colors.primary }} onPress={navigateSignup}>
					Sign up
				</Text>
			</View>
		</Page>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		fontFamily: "Lobster-Regular",
		fontSize: 48,
	},
	input: {
		marginTop: 20,
		width: "100%",
	},
	button: {
		marginTop: 40,
		width: "100%",
	},
	textContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 40,
	},
	signUpButton: {},
});
