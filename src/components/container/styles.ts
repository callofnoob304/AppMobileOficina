import { colors } from 'src/styles/colors';
import { spacing } from 'src/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: colors.background,
		flex: 1,
	},
	flex: {
		flex: 1,
	},
	container: {
		backgroundColor: colors.background,
		padding: spacing.xl,
		flex: 1,
	},
	noPadding: {
		padding: 0,
	},
});
