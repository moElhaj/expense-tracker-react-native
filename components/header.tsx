import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "../context/auth";
import { layout, text } from "../components/styles";

const Home = () => {
	const { logout } = useAuth();
	return (
		<View style={[layout.grayBackground, layout.flex, styles.home]}>
			<Text>Home</Text>
			<TouchableWithoutFeedback onPress={logout}>
				<Text>Logout</Text>
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	home: {
		paddingHorizontal: 10,
		paddingVertical: 100,
	},
});

export default Home;
