import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./context/auth";
import Home from "./screens/home";
import Login from "./screens/login";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
				<Layout />
				<StatusBar style="dark" />
			</NavigationContainer>
		</AuthProvider>
	);
}

export const Layout = () => {
	const { authState } = useAuth();
	return (
		<Stack.Navigator>
			{authState?.authenticated ? (
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
				></Stack.Screen>
			) : (
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				></Stack.Screen>
			)}
		</Stack.Navigator>
	);
};

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
