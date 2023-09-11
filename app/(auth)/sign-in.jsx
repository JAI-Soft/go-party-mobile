import { Text, View } from '@Components/Themed';
import { Button } from 'react-native';
import { useAuth } from '@Context/auth';

const signIn = () => {

	const { signIn } = useAuth();

	return (
		<View className="items-center justify-center flex-1">
			<Text>sign-in</Text>
			<Button title="Sign In" onPress={signIn} />
		</View>
	);
};

export default signIn;
