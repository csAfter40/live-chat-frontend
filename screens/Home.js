import React from "react";
import BottomTabNavigation from "../components/navigators/BottomTabNavigation";
import useGlobal from "../global";

export default function Home() {
	const socketConnect = useGlobal((state) => state.socketConnect);
	const socketClose = useGlobal((state) => state.socketClose);
	React.useEffect(() => {
		socketConnect();
		return socketClose;
	}, []);
	return <BottomTabNavigation />;
}
