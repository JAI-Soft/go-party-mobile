import '../global.css';

import { Text, View } from '@Components/Themed';
import { AuthProvider } from '@Context/auth';
import * as eva from '@eva-design/eva';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider
} from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)'
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		Inter: require('../assets/fonts/Inter-Regular.ttf'),
		...FontAwesome.font
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return (
			<View className="flex-1 items-center justify-center">
				<Text className="text-2xl text-teal-200">Loading...</Text>
			</View>
		);
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<AuthProvider>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<ApplicationProvider
					{...eva}
					theme={colorScheme === 'dark' ? eva.dark : eva.light}
				>
					<Slot />
				</ApplicationProvider>
			</ThemeProvider>
		</AuthProvider>
	);
}
