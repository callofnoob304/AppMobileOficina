import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "src/styles/colors";
import { styles } from "./styles";
import React from "react";

interface Props {
	title: string;
	subtitle?: string;
	onBack?: () => void;
	right?: React.ReactNode;
}

export default function ScreenHeader({ title, subtitle, onBack, right }: Props) {
	return (
		<View style={styles.container}>
			<View style={styles.left}>
				{onBack && (
					<TouchableOpacity onPress={onBack} style={styles.back} hitSlop={8}>
						<Icon name="chevron-left" size={28} color={colors.text.primary} />
					</TouchableOpacity>
				)}
				<View style={styles.titles}>
					<Text style={styles.title} numberOfLines={1}>
						{title}
					</Text>
					{subtitle ? (
						<Text style={styles.subtitle} numberOfLines={1}>
							{subtitle}
						</Text>
					) : null}
				</View>
			</View>
			{right ? <View>{right}</View> : null}
		</View>
	);
}
