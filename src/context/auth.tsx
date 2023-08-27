import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '@Services/api';
import type { User, UserLogin, UserRegister } from '@Types/index';
import { router, useRootNavigationState, useSegments } from 'expo-router';
import * as React from 'react';

interface ContextInterface {
	user: User | null;
	signIn: (email: string, password: string) => void;
	signUp: (
		email: string,
		password: string,
		password_confirmation: string,
		username: string,
		birthday: string,
		first_name: string,
		surname: string
	) => void;
	signOut: () => void;
}

const userInitialState = {
	id: '',
	token: ''
};

const contextInitialState: ContextInterface = {
	user: userInitialState,
	signIn: async () => {},
	signUp: async () => {},
	signOut: () => {}
};

const AuthContext = React.createContext(contextInitialState);

export function useAuth(): ContextInterface {
	const context = React.useContext<ContextInterface>(AuthContext);

	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

function useProtectedRoute(user: User) {
	const segments = useSegments();
	const navigationState = useRootNavigationState();

	const [hasNavigated, setHasNavigated] = React.useState(false);

	React.useEffect(() => {
		if (!navigationState.key || hasNavigated) return;

		const isAuthGroup = segments[0] === '/(auth)';

		if (!user.id && !isAuthGroup) {
			router.replace('/(auth)/welcome');
			setHasNavigated(true);
		} else if (user.id && isAuthGroup) {
			router.replace('/(tabs)');
			setHasNavigated(true);
		}
	}, [user.id, segments, navigationState, hasNavigated]);
}

export function AuthProvider({
	children
}: React.PropsWithChildren): JSX.Element {
	const [user, setUser] = React.useState<User>(userInitialState);

	useProtectedRoute(user);

	React.useEffect(() => {
		const getUser = async () => {
			const user = await AsyncStorage.getItem('user');
			if (user) {
				setUser(JSON.parse(user));
				router.replace('/(tabs)');
			}
		};
		getUser();
	}, []);

	const signIn = async (email: string, password: string) => {
		const data: UserLogin = {
			email,
			password
		};
		const response = await Api.login(data);

		if (response.user) {
			const userData: User = {
				id: response.user.id,
				token: response.token
			};
			await AsyncStorage.setItem('user', JSON.stringify(userData));
			setUser(userData);
			router.replace('/(tabs)');
		} else {
			console.log('Error signing in.');
		}
	};

	const signUp = async (
		email: string,
		password: string,
		password_confirmation: string,
		username: string,
		birthday: string,
		first_name: string,
		surname: string
	) => {
		const data: UserRegister = {
			email,
			password,
			password_confirmation,
			username,
			birthday,
			first_name,
			surname
		};
		const response = await Api.signUp(data);

		if (response.user) {
			const userData: User = {
				id: response.user.id,
				token: response.token
			};
			setUser(userData);
			router.replace('/(tabs)');
		} else {
			console.log('Error signing in.');
		}
	};

	const signOut = () => {
		setUser(userInitialState);
		AsyncStorage.removeItem('user');
		router.replace('/(auth)/welcome');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				signIn,
				signOut,
				signUp
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
