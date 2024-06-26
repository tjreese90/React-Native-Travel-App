// _layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Colors from '../../constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
	const colorScheme = useColorScheme() || 'light';
	const themeColors = Colors[colorScheme];

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: themeColors.tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'home' : 'home-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='explore'
				options={{
					title: 'Explore',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'code-slash' : 'code-slash-outline'}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
