import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Loader from "../components/loader";
import { text } from "../components/styles";
import axios from "../utils/axios";

export default function Details({ setScreen, selectedExpense, setSelectedExpense, getExpenses }) {
	const [loading, setLoading] = useState(false);

	const deleteExpense = () => {
		setLoading(true);
		Alert.alert("Delete Expense", "This expense will be permanently deleted", [
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "OK",
				onPress: async () => {
					try {
						await axios.delete(`/expenses/${selectedExpense.id}`);
						getExpenses();
					} catch (error) {
						alert("Error deleting expense, try again later");
					}
					setSelectedExpense(null);
					setScreen("home");
				},
			},
		]);
		setLoading(false);
		setScreen("home");
	};
	if (loading) return <Loader />;
	return (
		<View style={styles.container}>
			<View style={{ width: 30 }}>
				<TouchableWithoutFeedback onPress={() => setSelectedExpense(null)}>
					<MaterialCommunityIcons name="arrow-left-thin" size={30} color="black" />
				</TouchableWithoutFeedback>
			</View>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingTop: 20,
				}}
			>
				<Text style={text.heading2}>{selectedExpense.title}</Text>
				<TouchableWithoutFeedback onPress={() => setScreen("edit")}>
					<MaterialCommunityIcons name="square-edit-outline" size={30} color="black" />
				</TouchableWithoutFeedback>
			</View>
			<View style={styles.details}>
				<Text>{selectedExpense.details}</Text>
			</View>
			<View style={{ paddingTop: 10 }}>
				<Button disabled={loading} onPress={deleteExpense} title="delete" color="#f43f5e" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 100,
	},
	header: {
		padding: 5,
		justifyContent: "space-between",
	},
	expense: {
		justifyContent: "space-around",
		alignItems: "center",
		marginVertical: 5,
		paddingVertical: 5,
		borderBottomColor: "#F0E8E3",
		borderBottomWidth: 0.3,
	},
	category: {
		width: "12%",
		padding: 10,
		backgroundColor: "#ebebeb",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	details: {
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: "#ebebeb",
		paddingVertical: 30,
		marginTop: 30,
	},
	amount: {
		width: "20%",
		textAlign: "center",
	},
	danger: {
		padding: 5,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		borderRadius: 5,
		height: 40,
	},
	deleteButton: {
		padding: 10,
		borderRadius: 5,
	},
});
