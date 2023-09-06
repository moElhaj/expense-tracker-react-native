import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";

const AuthContext = createContext<any>({});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [authState, setAuthState] = useState<{
		token: string | null;
		authenticated: boolean | null;
	}>({
		token: null,
		authenticated: null,
	});

	useEffect(() => {
		(async () => {
			const token = await AsyncStorage.getItem("@token");
			const user = await AsyncStorage.getItem("@user");
			if (token && user) {
				setAuthState({
					token: token,
					authenticated: true,
				});
				setUser(JSON.parse(user));
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			}
		})();
	}, []);

	const register = async (name: string, email: string, password: string) => {
		setLoading(true);
		try {
			return await axios.post("/auth/register", { name, email, password });
		} catch (e) {
			setLoading(false);
			return { error: true, msg: (e as any).response.data.msg };
		}
	};

	const login = async (email: string, password: string) => {
		setLoading(true);
		try {
			const response = await axios.post("/auth/login", { email, password });
			setAuthState({
				token: response.data.token,
				authenticated: true,
			});
			setUser(response.data.user);
			axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
			await AsyncStorage.setItem("@token", response.data.token);
			await AsyncStorage.setItem("@user", JSON.stringify(response.data.user));
			setLoading(false);
		} catch (e) {
			setLoading(false);
			return alert(e);
		}
		setLoading(false);
	};

	const logout = async () => {
		axios.defaults.headers.common["Authorization"] = "";
		setAuthState({
			token: null,
			authenticated: false,
		});
		setUser(null);
		await AsyncStorage.removeItem("@token");
		await AsyncStorage.removeItem("@user");
	};

	return (
		<AuthContext.Provider
			value={{ loading, authState, setAuthState, user, register, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
