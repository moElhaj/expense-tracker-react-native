import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import axios from "../utils/axios";
import React, { useState } from "react";
import {
	Button,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Loader from "../components/loader";
import { layout } from "../components/styles";
import { useAuth } from "../context/auth";

export default function Edit({ setScreen, selectedExpense, setSelectedExpense, getExpenses }) {
	const { user } = useAuth();
	const [title, setTitle] = useState(selectedExpense.title);
	const [details, setDetails] = useState(selectedExpense.details);
	const [amount, setAmount] = useState(selectedExpense.amount);
	const [category, setCategory] = useState(selectedExpense.category);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const updateExpense = async () => {
		setLoading(true);
		if (title === "" || details === "" || amount === "" || category === "")
			return setError("All fields are required");
		if (isNaN(parseFloat(amount))) return setError("Amount should be a number");
		try {
			await axios.put(`/expenses/${selectedExpense.id}`, {
				id: selectedExpense.id,
				title,
				details,
				amount,
				category,
				userId: user.id,
			});
			getExpenses();
		} catch (error) {
			setError("Error updating expense, try again later");
		}
		setSelectedExpense(null);
		setScreen("home");
		setLoading(false);
	};

	if (loading) return <Loader />;
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
			>
				<View style={styles.container}>
					<View style={{ width: 30 }}>
						<TouchableWithoutFeedback onPress={() => setScreen("home")}>
							<MaterialCommunityIcons
								name="arrow-left-thin"
								size={30}
								color="black"
							/>
						</TouchableWithoutFeedback>
					</View>
					{error !== "" && (
						<View style={{ paddingTop: 20 }}>
							<Text style={{ color: "#f43f5e" }}>{error}</Text>
						</View>
					)}
					<View style={{ paddingTop: 10 }}>
						<TextInput
							style={layout.input}
							value={title}
							onChangeText={title => setTitle(title)}
							placeholder="Title"
						/>
						<TextInput
							style={layout.input}
							value={details}
							onChangeText={details => setDetails(details)}
							placeholder="Details"
							multiline={true}
							numberOfLines={4}
						/>
						<TextInput
							style={layout.input}
							value={amount}
							onChangeText={amount => setAmount(amount)}
							placeholder="Amount"
						/>

						<View>
							<Text>{selectedExpense.category}</Text>
						</View>

						<Picker
							selectedValue={category}
							onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
							style={layout.input}
						>
							<Picker.Item label="Category" />
							<Picker.Item label="Rent" value="Rent" />
							<Picker.Item label="Shopping" value="Shopping" />
							<Picker.Item label="Transportation" value="Transportation" />
							<Picker.Item label="Entertainment" value="Entertainment" />
							<Picker.Item label="Health" value="Health" />
							<Picker.Item label="Utilities" value="Utilities" />
							<Picker.Item label="Others" value="Others" />
						</Picker>
						<View style={{ paddingTop: 10 }}>
							<Button onPress={updateExpense} title="Update" color="#4f46e5" />
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
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
	description: {
		width: "70%",
		paddingLeft: 10,
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
});
