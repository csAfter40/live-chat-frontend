import { StyleSheet, View } from "react-native";
import { Text, Avatar, Appbar, TextInput, IconButton } from "react-native-paper";
import React from "react";
import Page from "../components/Page";
import { getThumbnail } from "../utils";
import useGlobal from "../global";
import SelfMessageListItem from "../components/SelfMessageListItem";
import OtherMessageListItem from "../components/OtherMessageListItem";
import { FlashList } from "@shopify/flash-list";

function MessagesTitle({ friend }) {
	return (
		<View style={styles.messageTitleContainer}>
			<Avatar.Image size={24} source={getThumbnail(friend.thumbnail)} />
			<Appbar.Content title={friend.full_name} />
		</View>
	);
}

export default function Messages({ navigation, route }) {
	const user = useGlobal((state) => state.user);
	const messageSend = useGlobal((state) => state.messageSend);
	const messageList = useGlobal((state) => state.messageList);
	const messages = useGlobal((state) => state.messages);
	const friend = route.params.friend;
	const connectionId = route.params.id;
	const [messageText, setMessageText] = React.useState("");
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: (props) => <MessagesTitle {...props} friend={friend} />,
		});
	}, []);
	React.useEffect(() => {
		messageList(connectionId);
	}, []);
	function onSend() {
		const cleanedText = messageText.replace(/\s+/g, " ").trim();
		if (cleanedText.length === 0) return;
		messageSend(connectionId, cleanedText);
		setMessageText("");
	}
	return (
		<Page style={styles.page}>
			<View style={styles.messagesContainer}>
				<FlashList
					data={messages}
					renderItem={({ item }) =>
						item.sender === user.id ? (
							<SelfMessageListItem message={item} />
						) : (
							<OtherMessageListItem message={item} friend={friend} />
						)
					}
					keyExtractor={(item) => item.id}
					estimatedItemSize={50}
					inverted={true}
				/>
			</View>
			<TextInput
				multiline={true}
				mode="outlined"
				value={messageText}
				onChangeText={setMessageText}
				style={styles.messageInput}
				outlineStyle={{ borderRadius: 10 }}
				label="Write message"
				right={
					<TextInput.Icon
						icon="send-circle"
						iconColor="#689f38"
						size={40}
						onPress={onSend}
						style={{ alignSelf: "center" }}
						disabled={messageText === ""}
					/>
				}
			/>
		</Page>
	);
}

const styles = StyleSheet.create({
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
	messageTitleContainer: {
		flexDirection: "row",
		gap: 15,
		alignItems: "center",
	},
	messagesContainer: {
		flex: 1,
		borderColor: "#808080",
		borderRadius: 10,
		borderWidth: 1,
		width: "100%",
		padding: 10,
	},
	messageInput: {
		width: "100%",
		marginVertical: 10,
		maxHeight: 100,
	},
});
