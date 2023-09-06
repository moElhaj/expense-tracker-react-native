import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Loader() {
	return (
		<View style={styles.loader}>
			<Text>Loading...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
