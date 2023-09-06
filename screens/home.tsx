import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Loader from "../components/loader";
import { text } from "../components/styles";
import Details from "./details";
import Edit from "./edit";
import Expense from "./expense";
import New from "./new";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/auth";

const Home = () => {
	const { logout } = useAuth();
	const [screen, setScreen] = useState("home");
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState(null);

	useEffect(() => {
		getExpenses();
	}, []);

	const getExpenses = async () => {
		const token = await AsyncStorage.getItem("@token");
		setLoading(true);
		try {
			const response = await axios.get("/expenses");
			setExpenses(response.data);
			setLoading(false);
		} catch (e) {
			alert(e);
			setLoading(false);
		}
		setLoading(false);
	};
	if (loading) return <Loader />;
	return (
		<>
			{!selectedExpense && screen === "home" && (
				<ScrollView style={styles.container}>
					<View style={styles.home}>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<View>
								<Text style={text.heading2}>Expenses</Text>
							</View>
							<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
								<Button onPress={logout} title="Logout" color="#4f46e5" />
							</View>
						</View>
						<View style={{ marginTop: 20 }}>
							<TouchableWithoutFeedback onPress={() => setScreen("new")}>
								<MaterialCommunityIcons
									name="plus-box-outline"
									size={30}
									color="black"
								/>
							</TouchableWithoutFeedback>
						</View>
						<View style={{ paddingTop: 10 }}>
							{expenses &&
								expenses.length > 0 &&
								expenses.map(expense => (
									<Expense
										key={expense.id}
										expense={expense}
										setSelectedExpense={setSelectedExpense}
									/>
								))}
							{expenses && expenses.length < 1 && (
								<View
									style={{
										alignItems: "center",
										justifyContent: "center",
										paddingVertical: 50,
									}}
								>
									<Text>Start by adding expense</Text>
								</View>
							)}
						</View>
					</View>
				</ScrollView>
			)}
			{selectedExpense && screen === "home" && (
				<Details
					setScreen={setScreen}
					selectedExpense={selectedExpense}
					setSelectedExpense={setSelectedExpense}
					getExpenses={getExpenses}
				/>
			)}
			{screen === "new" && !selectedExpense && (
				<New setScreen={setScreen} getExpenses={getExpenses} />
			)}
			{screen === "edit" && selectedExpense && (
				<Edit
					setScreen={setScreen}
					getExpenses={getExpenses}
					selectedExpense={selectedExpense}
					setSelectedExpense={setSelectedExpense}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	home: {
		paddingHorizontal: 10,
		paddingVertical: 100,
	},
});

export default Home;
