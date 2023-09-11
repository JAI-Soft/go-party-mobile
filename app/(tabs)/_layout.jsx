import { Octicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, Text } from "react-native";
import Colors from "../../constants/Colors";
import { useColorScheme } from 'react-native';

export default function TabsLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			initialRouteName="/"
			screenOptions={{
				tabBarStyle: {
					backgroundColor: Colors[colorScheme ?? 'light'].background,
					borderTopColor: Colors[colorScheme ?? 'light'].tint,
					borderTopWidth: Platform.OS === "ios" ? 0.5 : 0,
				},
				headerShown: false,
				tabBarActiveTintColor: "#47C6F4",
				tabBarInactiveTintColor: "#292D32",
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					href: "/",
					title: "",
					tabBarIcon: ({ color }) => (
						<View
							style={{
								flexDirection: "column",
								alignItems: "center",
								marginTop: 17,
								backgroundColor: "transparent",
							}}
						>
							<TabBarIcon name="home" color={color} size={24} />
							<Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
								Home
							</Text>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="calendar"
				options={{
					title: "",
					href: {
						pathname: "/calendar",
					},
					tabBarIcon: ({ color }) => (
						<View
							style={{
								flexDirection: "column",
								alignItems: "center",
								marginTop: 17,
								backgroundColor: "transparent",
							}}
						>
							<TabBarIcon name="calendar" color={color} size={24} />
							<Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
								Account
							</Text>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "",
					href: {
						pathname: "/profile",
					},
					tabBarIcon: ({ color }) => (
						<View
							style={{
								flexDirection: "column",
								alignItems: "center",
								marginTop: 17,
								backgroundColor: "transparent",
							}}
						>
							<TabBarIcon name="person" color={color} size={24} />
							<Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
								Account
							</Text>
						</View>
					),
				}}
			/>
		</Tabs>
	);
}

function TabBarIcon(props) {
	return (
		<Octicons
			size={props.size || 26}
			style={{ marginBottom: -3 }}
			{...props}
		/>
	);
}