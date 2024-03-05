import ProfileImage from "./assets/images/user-avatar.jpg";
import { ADDRESS } from "./api";

export function getThumbnail(url) {
	if (!url) {
		return ProfileImage;
	}
	return { uri: `http://${ADDRESS}${url}` };
}

export function formatTime(date) {
	if (date === null) {
		return "-";
	}
	const now = new Date();
	const timeDelta = Math.abs(now - new Date(date)) / 1000; //seconds

	if (timeDelta < 60) {
		return "now";
	} else if (timeDelta < 60 * 60) {
		const mins = Math.floor(timeDelta / 60);
		return `${mins}m ago`;
	} else if (timeDelta < 60 * 60 * 24) {
		const hours = Math.floor(timeDelta / (60 * 60));
		return `${hours}h ago`;
	} else if (timeDelta < 60 * 60 * 24 * 7) {
		const days = Math.floor(timeDelta / (60 * 60 * 24));
		return `${days}d ago`;
	} else if (timeDelta < 60 * 60 * 24 * 31) {
		const weeks = Math.floor(timeDelta / (60 * 60 * 24 * 7));
		return `${weeks}w ago`;
	} else if (timeDelta < 60 * 60 * 24 * 365) {
		const months = Math.floor(timeDelta / (60 * 60 * 24 * 31));
		return `${months}mo ago`;
	} else {
		const years = Math.floor(timeDelta / (60 * 60 * 24 * 365));
		return `${years}y ago`;
	}
}