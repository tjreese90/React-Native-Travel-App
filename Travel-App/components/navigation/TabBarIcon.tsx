import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps } from 'react';

type IconProps = ComponentProps<typeof Ionicons> & {
	name: string;
};

export function TabBarIcon({ style, name, ...rest }: IconProps) {
	return (
		<Ionicons
			name={name}
			size={28}
			style={[{ marginBottom: -3 }, style]}
			{...rest}
		/>
	);
}
