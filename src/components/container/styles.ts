import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";
import { spacing } from "src/styles/theme";

export const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: colors.background,
	},
	flex: {
		flex: 1,
	},
	container: {
		flex: 1,
		padding: spacing.xl,
		backgroundColor: colors.background,
	},
	noPadding: {
		padding: 0,
	},
});
