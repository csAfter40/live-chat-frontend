import React from "react";
import SelfMessageListItem from "./SelfMessageListItem";
import OtherMessageListItem from "./OtherMessageListItem";
import TypingMessageListItem from "./TypingMessageListItem";
import useGlobal from "../global";

export default function MessageListItem({ index, message, friend, isMyMessage }) {
	const [showTyping, setShowTyping] = React.useState(false);
	const messagesTyping = useGlobal((state) => state.messagesTyping);
	React.useEffect(() => {
		if (index !== 0) return;
		if (messagesTyping === null) {
			setShowTyping(false);
			return;
		}
		setShowTyping(true);
		const check = setInterval(() => {
			const now = new Date();
			const diff = now - messagesTyping;
			if (diff > 10000) {
				setShowTyping(false);
			}
		}, 1000);
		return () => clearInterval(check);
	}, [messagesTyping]);
	if (index === 0) {
		if (showTyping) {
			return <TypingMessageListItem friend={friend} />;
		}
		return;
	}

	return isMyMessage ? (
		<SelfMessageListItem message={message} />
	) : (
		<OtherMessageListItem message={message} friend={friend} />
	);
}
