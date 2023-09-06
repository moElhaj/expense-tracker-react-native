import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { layout, text } from "../components/styles";

export default function Expense({ expense, setSelectedExpense }) {
	return (
		<View style={[styles.expense, layout.flexRow, layout.grayBackground]}>
			<TouchableWithoutFeedback onPress={() => setSelectedExpense(expense)}>
				<View
					style={{
						width: "100%",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<View>
						<Text numberOfLines={1} style={{ fontSize: 18 }}>
							{expense.title}
						</Text>
						<Text numberOfLines={1} style={text.grayText}>
							{expense.category}
						</Text>
					</View>
					<Text numberOfLines={1} style={styles.amount}>
						{expense.amount}
					</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	expense: {
		marginVertical: 5,
		paddingVertical: 8,
		paddingHorizontal: 10,
		width: "auto",
		borderColor: "#cbd5e1",
		borderWidth: 1,
		borderRadius: 5,
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
