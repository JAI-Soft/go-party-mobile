import EditScreenInfo from '@Components/EditScreenInfo';
import { Text, View } from '@Components/Themed';
import { Button, StyleSheet } from 'react-native';
import { useAuth } from '@Context/auth';

export default function Home() {

	const { signOut } = useAuth();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Home</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<EditScreenInfo path="app/(tabs)/index.jsx" />
			<Button title="Sign Out" onPress={signOut} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%'
	}
});
