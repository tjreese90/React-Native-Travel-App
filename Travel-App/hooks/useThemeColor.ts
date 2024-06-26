import Colors from '../constants/Colors';

export function useThemeColor(
	props: { light?: string },
	colorName: keyof typeof Colors.light
) {
	const colorFromProps = props.light;

	if (colorFromProps) {
		return colorFromProps;
	} else if (Colors.light && Colors.light[colorName]) {
		return Colors.light[colorName];
	} else {
		// Fallback if colorName does not exist in Colors
		return Colors.light[colorName] || '#000';
	}
}
