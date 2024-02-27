import { StyleSheet, View } from "react-native";
import React from "react";
import Page from "../components/Page";
import { Text, TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "react-native-paper";
import useGlobal from "../global";
import axiosInstance from "../api";

export default function SignUp({ navigation }) {
	const login = useGlobal((state) => state.login);
	const startSpinner = useGlobal((state) => state.startSpinner);
	const stopSpinner = useGlobal((state) => state.stopSpinner);
	const theme = useTheme();
	const [hidePassword1, setHidePassword1] = React.useState(true);
	const [hidePassword2, setHidePassword2] = React.useState(true);
	function togglePasswordView1() {
		setHidePassword1((prevValue) => !prevValue);
	}
	function togglePasswordView2() {
		setHidePassword2((prevValue) => !prevValue);
	}
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "",
			email: "",
			firstName: "",
			lastName: "",
			password1: "",
			password2: "",
		},
		mode: "onSubmit",
	});
	function onSubmit(data) {
		startSpinner();
		postData = {
			username: data.username,
			email: data.email,
			first_name: data.firstName,
			last_name: data.lastName,
			password: data.password1,
		};
		axiosInstance
			.post("/chat/signup/", postData)
			.then((res) => {
				const user = res.data.user;
				const tokens = res.data.tokens;
				const credentials = {
					username: postData.username,
					password: postData.password,
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
	function navigateSignin() {
		navigation.navigate("SignIn");
	}
	return (
		<Page style={styles.page}>
			<Text variant="headlineSmall">Sign Up</Text>
			<Controller
				control={control}
				name="username"
				rules={{
					required: "Username is required",
					maxLength: {
						value: 30,
						message: "Username can not be more than 30 characters",
					},
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
						right={
							<TextInput.Affix
								textStyle={{
									color:
										value.length > 30 ? theme.colors.error : "black",
								}}
								text={`${value.length}/30`}
							/>
						}
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
				name="email"
				rules={{
					required: "Email is required",
					pattern: {
						value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
						message: "Invalid email address",
					},
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						label="Email"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						style={styles.input}
						mode="outlined"
						autoCapitalize="none"
					/>
				)}
			/>
			{errors.email && (
				<Text
					variant="labelSmall"
					style={{
						color: theme.colors.error,
						alignSelf: "flex-start",
					}}
				>
					{errors.email.message}
				</Text>
			)}
			<View style={styles.inputRowContainer}>
				<View style={{ flex: 1 }}>
					<Controller
						control={control}
						name="firstName"
						rules={{
							maxLength: {
								value: 50,
								message: "Please enter a shorter name",
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								label="First Name"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								style={styles.input}
								mode="outlined"
							/>
						)}
					/>
					{errors.firstName && (
						<Text
							variant="labelSmall"
							style={{
								color: theme.colors.error,
								alignSelf: "flex-start",
							}}
						>
							{errors.firstName.message}
						</Text>
					)}
				</View>
				<View style={{ flex: 1 }}>
					<Controller
						control={control}
						name="lastName"
						rules={{
							maxLength: {
								value: 50,
								message: "Please enter a shorter name",
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								label="Last Name"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								style={styles.input}
								mode="outlined"
							/>
						)}
					/>
					{errors.lastName && (
						<Text
							variant="labelSmall"
							style={{
								color: theme.colors.error,
								alignSelf: "flex-start",
							}}
						>
							{errors.lastName.message}
						</Text>
					)}
				</View>
			</View>
			<Controller
				control={control}
				name="password1"
				rules={{ required: "Password is required" }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						label="Password"
						value={value}
						onChangeText={onChange}
						secureTextEntry={hidePassword1}
						onBlur={onBlur}
						style={styles.input}
						mode="outlined"
						right={
							<TextInput.Icon
								onPress={togglePasswordView1}
								icon={hidePassword1 ? "eye" : "eye-off"}
							/>
						}
						autoCapitalize="none"
					/>
				)}
			/>
			{errors.password1 && (
				<Text
					variant="labelSmall"
					style={{ color: theme.colors.error, alignSelf: "flex-start" }}
				>
					{errors.password1.message}
				</Text>
			)}
			<Controller
				control={control}
				name="password2"
				rules={{
					required: "Password is required",
					validate: (val) =>
						val === watch("password1") || "Passwords not matching",
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						label="Confirm Password"
						value={value}
						onChangeText={(value) => onChange(value)}
						secureTextEntry={hidePassword2}
						onBlur={onBlur}
						style={styles.input}
						mode="outlined"
						right={
							<TextInput.Icon
								onPress={togglePasswordView2}
								icon={hidePassword2 ? "eye" : "eye-off"}
							/>
						}
						autoCapitalize="none"
					/>
				)}
			/>
			{errors.password2 && (
				<Text
					variant="labelSmall"
					style={{ color: theme.colors.error, alignSelf: "flex-start" }}
				>
					{errors.password2.message}
				</Text>
			)}
			<Button
				style={styles.button}
				mode="contained"
				onPress={handleSubmit(onSubmit)}
			>
				Sign Up
			</Button>
			<View style={styles.textContainer}>
				<Text>Already have an account? </Text>
				<Text style={{ color: theme.colors.primary }} onPress={navigateSignin}>
					Sign in
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
	input: {
		marginTop: 20,
		width: "100%",
	},
	inputRowContainer: {
		flexDirection: "row",
		gap: 10,
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
