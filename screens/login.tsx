import {
	View,
	StyleSheet,
	Text,
	TextInput,
	Button,
	TouchableOpacity,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	ActivityIndicator,
} from "react-native";
import { useState, useCallback } from "react";
import { useAuth } from "../context/auth";
import { layout, text } from "../components/styles";

const Login = () => {
	const [screen, setScreen] = useState("login");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [error, setError] = useState("");
	const { loading, login, register } = useAuth();

	const handleLogin = async () => {
		const response = await login(email, password);
		if (response && response.status !== 200) {
			setError("Wrong Credentials");
		}
	};

	const handleRegister = async () => {
		if (password !== confirm) return setError("Passwords didn't match");
		const response = await register(name, email, password);
		if (response && response.status === 200) {
			handleLogin();
		}
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
			>
				<View style={[layout.grayBackground, layout.flex, styles.auth]}>
					<Text style={text.heading}>Expenses Calculator</Text>
					{error !== "" && (
						<View style={{ paddingTop: 20 }}>
							<Text style={{ color: "#f43f5e" }}>{error}</Text>
						</View>
					)}
					{screen === "login" && (
						<>
							<View style={{ paddingTop: 10 }}>
								<TextInput
									style={layout.input}
									value={email}
									onChangeText={email => setEmail(email)}
									placeholder="Email"
									keyboardType="email-address"
									autoCapitalize="none"
								/>
								<TextInput
									style={layout.input}
									placeholder="Password"
									secureTextEntry={true}
									value={password}
									onChangeText={(text: string) => setPassword(text)}
								/>
								{loading && (
									<View style={{ paddingTop: 10 }}>
										<ActivityIndicator />
									</View>
								)}
								{!loading && (
									<View style={{ paddingTop: 10 }}>
										<Button
											disabled={loading}
											onPress={handleLogin}
											title="Sign In"
											color="#4f46e5"
										/>
									</View>
								)}
							</View>
							<View style={{ paddingTop: 50 }}>
								<TouchableOpacity onPress={() => setScreen("register")}>
									<Text>Don't have an account, Sign Up</Text>
								</TouchableOpacity>
							</View>
						</>
					)}

					{screen === "register" && (
						<>
							<View>
								<TextInput
									style={layout.input}
									value={name}
									onChangeText={name => setName(name)}
									placeholder="name"
								/>
								<TextInput
									style={layout.input}
									value={email}
									onChangeText={email => setEmail(email)}
									placeholder="Email"
									keyboardType="email-address"
									autoCapitalize="none"
								/>
								<TextInput
									style={layout.input}
									placeholder="Password"
									secureTextEntry={true}
									value={password}
									onChangeText={(text: string) => setPassword(text)}
								/>
								<TextInput
									style={layout.input}
									placeholder="Confirm Password"
									secureTextEntry={true}
									value={confirm}
									onChangeText={(text: string) => setConfirm(text)}
								/>
								{loading && (
									<View style={{ paddingTop: 10 }}>
										<ActivityIndicator />
									</View>
								)}
								{!loading && (
									<View style={{ paddingTop: 10 }}>
										<Button
											disabled={loading}
											onPress={handleRegister}
											title="Sign Up"
											color="#4f46e5"
										/>
									</View>
								)}
							</View>

							<View style={{ paddingTop: 50 }}>
								<TouchableOpacity onPress={() => setScreen("login")}>
									<Text>Already have an account Sign In</Text>
								</TouchableOpacity>
							</View>
						</>
					)}
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	auth: {
		paddingHorizontal: 10,
		paddingTop: 200,
	},
});

export default Login;
