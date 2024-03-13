import { StyleSheet, View } from "react-native";
import { Surface, Avatar } from "react-native-paper";
import React from "react";
import { getThumbnail } from "../utils";
import { useTheme } from "react-native-paper";
import { Animated, Easing } from "react-native";

function MessageTypingAnimation({ offset }) {
	const theme = useTheme();
	const y = React.useRef(new Animated.Value(0)).current;
	React.useEffect(() => {
		const animationDuration = 1000; //ms
		const bumpDuration = 200;
		const animation = Animated.loop(
			Animated.sequence([
				Animated.delay(bumpDuration * offset),
				Animated.timing(y, {
					toValue: 1,
					duration: bumpDuration,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
				Animated.timing(y, {
					toValue: 0,
					duration: bumpDuration,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
				Animated.delay(
					animationDuration - bumpDuration * 2 - bumpDuration * offset
				),
			])
		);
		animation.start();
		return () => {
			animation.stop();
		};
	}, []);
	const translateY = y.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -8],
	});
	return (
		<Animated.View
			style={{
				width: 8,
				height: 8,
				borderRadius: 4,
				marginHorizontal: 2,
				backgroundColor: theme.colors.onTertiary,
				transform: [{ translateY }],
			}}
		></Animated.View>
	);
}

export default function TypingMessageListItem({ friend }) {
	const theme = useTheme();
	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "flex-start",
			justifyContent: "flex-start",
			gap: 5,
			width: "100%",
			marginVertical: 2,
		},
		bubble: {
			maxWidth: "75%",
			padding: 5,
			paddingHorizontal: 10,
			borderRadius: 10,
			marginVertical: 3,
			backgroundColor: theme.colors.secondary,
			height: 30,
		},
		bubbleText: {
			color: theme.colors.onSecondary,
		},
	});
	return (
		<View style={styles.container}>
			<Avatar.Image
				style={{ marginTop: 2 }}
				size={28}
				source={getThumbnail(friend.thumbnail)}
			/>
			<Surface style={styles.bubble}>
				<View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
					<MessageTypingAnimation offset={1} />
					<MessageTypingAnimation offset={2} />
					<MessageTypingAnimation offset={3} />
				</View>
			</Surface>
		</View>
	);
}
