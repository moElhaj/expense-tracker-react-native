import { StyleSheet } from "react-native";

const layout = StyleSheet.create({
	flex: {
		flex: 1,
	},
	darkBackground: {
		backgroundColor: "#9E9E9E",
	},
	grayBackground: {
		backgroundColor: "#FAFAFA",
	},
	redBackground: {
		backgroundColor: "#EE315E",
	},
	violetBackground: {
		backgroundColor: "#918ABD",
	},
	orangeBackground: {
		backgroundColor: "#FA9B47",
	},
	greenBackground: {
		backgroundColor: "#65CD7F",
	},
	center: {
		justifyContent: "center",
		alignItems: "center",
	},
	box: {
		backgroundColor: "#ffffff",
		shadowColor: "#000",
		shadowOpacity: 0.11,
		shadowRadius: 1.22,
		elevation: 3,
		borderRadius: 5,
		shadowOffset: {
			width: 0,
			height: 1,
		},
	},
	flexRow: {
		flexDirection: "row",
	},
	btn: {
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		backgroundColor: "#4f46e5",
	},
	input: {
		fontSize: 16,
		padding: 10,
		marginVertical: 10,
		width: "100%",
		borderColor: "#cbd5e1",
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: "#FFFFFF",
	},
});

const text = StyleSheet.create({
	heading: {
		fontSize: 30,
		fontWeight: "700",
	},
	heading2: {
		fontSize: 25,
		fontWeight: "700",
	},
	smallText: {
		fontSize: 14,
		fontWeight: "700",
	},
	whiteText: {
		color: "#FFFFFF",
	},
	blackText: {
		color: "#33404F",
	},
	grayText: {
		color: "#9E9E9E",
	},
	greenText: {
		color: "#65CD7F",
	},
});

export { layout, text };
