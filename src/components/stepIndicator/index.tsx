import { View, Text } from 'react-native';
import { styles } from './styles';
import React from 'react';

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
