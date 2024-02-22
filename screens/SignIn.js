import { StyleSheet, View } from "react-native";
import React from "react";
import Page from "../components/Page";
import { Text, TextInput, Button, TouchableRipple } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "react-native-paper";

export default function SignIn({ navigation }) {
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
		console.log(data);
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
