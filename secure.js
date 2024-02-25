import * as SecureStore from "expo-secure-store";

async function storeKey(key, value) {
	try {
		await SecureStore.setItemAsync(key, value);
	} catch (error) {
		console.log(error);
	}
}

async function retrieveKey(key) {
	try {
		const value = await SecureStore.getItemAsync(key);

		if (value !== undefined) {
			return value;
		}
	} catch (error) {
		console.log(error);
	}
}

async function removeKey(key) {
	try {
		await SecureStore.deleteItemAsync(key);
	} catch (error) {
		console.log(error);
	}
}

export default { storeKey, retrieveKey, removeKey };
