import { View, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { spacing } from "../styles/theme";
import React from "react";

interface Props {
	current: number;
	total: number;
	labels?: string[];
}

export default function StepIndicator({ current, total, labels }: Props) {
	return (
		<View style={styles.container}>
			{Array.from({ length: total }).map((_, i) => {
				const step = i + 1;
				const done = step < current;
				const active = step === current;
				return (
					<React.Fragment key={step}>
						<View style={styles.item}>
							<View style={[styles.dot, (active || done) && styles.dotActive]}>
								<Text style={[styles.dotText, (active || done) && styles.dotTextActive]}>
									{step}
								</Text>
							</View>
							{labels?.[i] ? (
								<Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>
									{labels[i]}
								</Text>
							) : null}
						</View>
						{step < total && <View style={[styles.line, done && styles.lineActive]} />}
					</React.Fragment>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.xs,
		marginBottom: spacing.lg,
	},
	item: {
		alignItems: "center",
		gap: 4,
	},
	dot: {
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: colors.surfaceAlt,
		borderWidth: 1,
		borderColor: colors.border,
		alignItems: "center",
		justifyContent: "center",
	},
	dotActive: {
		backgroundColor: colors.yellow[400],
		borderColor: colors.yellow[400],
	},
	dotText: {
		color: colors.text.muted,
		fontWeight: "700",
		fontSize: 13,
	},
	dotTextActive: {
		color: colors.text.inverse,
	},
	label: {
		fontSize: 11,
		color: colors.text.muted,
	},
	labelActive: {
		color: colors.text.primary,
	},
	line: {
		width: 28,
		height: 2,
		backgroundColor: colors.border,
		marginBottom: 16,
	},
	lineActive: {
		backgroundColor: colors.yellow[400],
	},
});
