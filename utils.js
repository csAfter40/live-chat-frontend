import ProfileImage from "./assets/images/user-avatar.jpg";
import { ADDRESS } from "./api";

export function getThumbnail(url) {
	if (!url) {
		return ProfileImage;
	}
	return { uri: `http://${ADDRESS}${url}` };
}
