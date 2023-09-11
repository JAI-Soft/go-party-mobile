import { Text, View } from '@Components/Themed';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

const welcome = () => {
	return (
		<View className="items-center justify-center flex-1">
			<Text className="text-2xl text-teal-200">Bienvenido</Text>
			<View className="flex-row items-center justify-center space-x-4">
				<Link href="/(auth)/sign-in" asChild>
					<Pressable>
						<Text>Sign In</Text>
					</Pressable>
				</Link>
				<Link href="/(auth)/sign-up" asChild>
					<Pressable>
						<Text>Sign Up</Text>
					</Pressable>
				</Link>
			</View>
		</View>
	);
};

export default welcome;
