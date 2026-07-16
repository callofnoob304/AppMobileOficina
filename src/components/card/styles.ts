import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";
import { radius, spacing } from "src/styles/theme";

export const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.surface,
		borderRadius: radius.lg,
		padding: spacing.lg,
		borderWidth: 1,
		borderColor: colors.border,
	},
	highlight: {
		borderLeftWidth: 4,
		borderLeftColor: colors.yellow[400],
	},
});
