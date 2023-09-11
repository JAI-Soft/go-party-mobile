import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '@Services/api';
import { router, useRootNavigationState, useSegments } from 'expo-router';
import * as React from 'react';

const AuthContext = React.createContext(null);

export function useAuth() {
	const context = React.useContext(AuthContext);

	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

function useProtectedRoute(user) {
	const segments = useSegments();
	const navigationState = useRootNavigationState();

	const [hasNavigated, setHasNavigated] = React.useState(false);

	React.useEffect(() => {
		if (!navigationState.key || hasNavigated) return;

		const isAuthGroup = segments[0] === '/(auth)';

		if (!user && !isAuthGroup) {
			router.replace('/(auth)/welcome');
			setHasNavigated(true);
		} else if (user && isAuthGroup) {
			router.replace('/(tabs)');
			setHasNavigated(true);
		}
	}, [user, segments, navigationState, hasNavigated]);
}

/**
 * Provides authentication context to the app.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be rendered.
 * @returns {JSX.Element} - JSX element.
 */
export function AuthProvider({
	children
}) {
	const [user, setUser] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);

	useProtectedRoute(user);

	React.useEffect(() => {
		/**
		 * Gets user data from AsyncStorage and sets it to state.
		 * @returns {void}
		 */
		const getUser = async () => {
			const user = await AsyncStorage.getItem('user');
			if (user) {
				setUser(JSON.parse(user));
			}
			setIsLoading(false);
		};
		getUser();
	}, []);

	/**
	 * Signs in the user with the provided email and password.
	 * @param {string} email - User's email.
	 * @param {string} password - User's password.
	 * @returns {void}
	 */
	const signIn = async (email, password) => {
		const data = {
			email,
			password
		};
		const response = await Api.login(data);

		if (response.user) {
			const userData = {
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

	/**
	 * Signs up the user with the provided data.
	 * @param {string} email - User's email.
	 * @param {string} password - User's password.
	 * @param {string} password_confirmation - User's password confirmation.
	 * @param {string} username - User's username.
	 * @param {string} birthday - User's birthday.
	 * @param {string} first_name - User's first name.
	 * @param {string} surname - User's surname.
	 * @returns {void}
	 */
	const signUp = async (
		email,
		password,
		password_confirmation,
		username,
		birthday,
		first_name,
		surname
	) => {
		const data = {
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
			const userData = {
				id: response.user.id,
				token: response.token
			};
			setUser(userData);
			router.replace('/(tabs)');
		} else {
			console.log('Error signing in.');
		}
	};

	/**
	 * Signs out the user.
	 * @returns {void}
	 */
	const signOut = () => {
		setUser(null);
		AsyncStorage.removeItem('user');
		router.replace('/(auth)/welcome');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				signIn,
				signOut,
				signUp,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
