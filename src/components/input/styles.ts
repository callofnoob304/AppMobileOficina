import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";
import { radius, spacing } from "src/styles/theme";

export const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.surface,
		borderRadius: radius.md,
		padding: spacing.lg,
		color: colors.text.primary,
		fontSize: 16,
	},
});
