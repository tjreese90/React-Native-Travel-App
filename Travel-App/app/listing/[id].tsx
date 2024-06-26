import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ListingType } from '@/types/listingType';
import listingData from '@/data/destinations.json';
import {
	Feather,
	FontAwesome,
	FontAwesome5,
	Ionicons,
} from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Animated, {
	SlideInDown,
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const ListingDetails = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const listing = listingData.find((item) => item.id === id) as ListingType;

	const router = useRouter();

	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);
	const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT],
						[-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT],
						[2, 1, 1]
					),
				},
			],
		};
	});

	return (
		<>
			<Stack.Screen
				options={{
					headerTransparent: true,
					headerTitle: '',
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => router.back()}
							style={styles.headerButton}
						>
							<View style={styles.headerIconWrapper}>
								<Feather name='arrow-left' size={20} />
							</View>
						</TouchableOpacity>
					),
					headerRight: () => (
						<TouchableOpacity onPress={() => {}} style={styles.headerButton}>
							<View style={styles.headerIconWrapper}>
								<Ionicons name='bookmark-outline' size={20} />
							</View>
						</TouchableOpacity>
					),
				}}
			/>
			<View style={styles.container}>
				<Animated.ScrollView
					ref={scrollRef}
					contentContainerStyle={{ paddingBottom: 150 }}
				>
					<Animated.Image
						source={{ uri: listing.image }}
						style={[styles.image, imageAnimatedStyle]}
					/>
					<View style={styles.contentWrapper}>
						<Text style={styles.listingName}>{listing.name}</Text>
						<View style={styles.listingLocationWrapper}>
							<FontAwesome5
								name='map-marker-alt'
								size={18}
								color={Colors.light.primaryColor}
							/>
							<Text style={styles.listingLocationTxt}>{listing.location}</Text>
						</View>

						<View style={styles.highlightWrapper}>
							<View style={styles.highlightItem}>
								<View style={styles.highlightIcon}>
									<Ionicons
										name='time'
										size={18}
										color={Colors.light.primaryColor}
									/>
								</View>
								<View>
									<Text style={styles.highlightTxt}>Duration</Text>
									<Text style={styles.highlightTxtVal}>
										{listing.duration} Days
									</Text>
								</View>
							</View>
							<View style={styles.highlightItem}>
								<View style={styles.highlightIcon}>
									<FontAwesome
										name='users'
										size={18}
										color={Colors.light.primaryColor}
									/>
								</View>
								<View>
									<Text style={styles.highlightTxt}>Person</Text>
									<Text style={styles.highlightTxtVal}>{listing.person}</Text>
								</View>
							</View>
							<View style={styles.highlightItem}>
								<View style={styles.highlightIcon}>
									<Ionicons
										name='star'
										size={18}
										color={Colors.light.primaryColor}
									/>
								</View>
								<View>
									<Text style={styles.highlightTxt}>Rating</Text>
									<Text style={styles.highlightTxtVal}>{listing.rating}</Text>
								</View>
							</View>
						</View>

						<Text style={styles.listingDetails}>{listing.description}</Text>
					</View>
				</Animated.ScrollView>
			</View>

			<Animated.View style={styles.footer} entering={SlideInDown.delay(200)}>
				<TouchableOpacity
					onPress={() => {}}
					style={[styles.footerBtn, styles.footerBookBtn]}
				>
					<Text style={styles.footerBtnTxt}>Book Now</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} style={styles.footerBtn}>
					<Text style={styles.footerBtnTxt}>${listing.price}</Text>
				</TouchableOpacity>
			</Animated.View>
		</>
	);
};

export default ListingDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.white,
	},
	image: {
		width: width,
		height: IMG_HEIGHT,
	},
	contentWrapper: {
		padding: 20,
		backgroundColor: Colors.light.white,
	},
	listingName: {
		fontSize: 24,
		fontWeight: '500',
		color: Colors.light.black,
		letterSpacing: 0.5,
	},
	listingLocationWrapper: {
		flexDirection: 'row',
		marginTop: 5,
		marginBottom: 10,
		alignItems: 'center',
	},
	listingLocationTxt: {
		fontSize: 14,
		marginLeft: 5,
		color: Colors.light.black,
	},
	highlightWrapper: {
		flexDirection: 'row',
		marginVertical: 20,
		justifyContent: 'space-between',
	},
	highlightItem: {
		flexDirection: 'row',
	},
	highlightIcon: {
		backgroundColor: '#F4F4F4',
		paddingHorizontal: 8,
		paddingVertical: 5,
		borderRadius: 8,
		marginRight: 5,
		alignItems: 'center',
	},
	highlightTxt: {
		fontSize: 12,
		color: '#999',
	},
	highlightTxtVal: {
		fontSize: 14,
		fontWeight: '600',
	},
	listingDetails: {
		fontSize: 16,
		color: Colors.light.black,
		lineHeight: 25,
		letterSpacing: 0.5,
	},
	footer: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 0,
		padding: 20,
		paddingBottom: 30,
		width: width,
	},
	footerBtn: {
		flex: 1,
		backgroundColor: Colors.light.black,
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
	footerBookBtn: {
		flex: 2,
		backgroundColor: Colors.light.primaryColor,
		marginRight: 20,
	},
	footerBtnTxt: {
		color: Colors.light.white,
		fontSize: 16,
		fontWeight: '600',
		textTransform: 'uppercase',
	},
	headerButton: {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderRadius: 10,
		padding: 4,
	},
	headerIconWrapper: {
		backgroundColor: Colors.light.white,
		padding: 6,
		borderRadius: 10,
	},
});
