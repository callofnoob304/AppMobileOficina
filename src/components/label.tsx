import { Text, TextProps, View } from "react-native";
import React from "react";

interface LabelProps extends TextProps {
	center?: boolean;
	linha?: boolean;
	title?: string;
	label?: string;
}

export default ({ title, label, center, linha, ...rest }: LabelProps) => {
	return (
		<View style={linha ? { flexDirection: "row", justifyContent: "space-between" } : { gap: 4 }}>
			{title &&
				<Text
					style={{ fontFamily: 'Inter', fontSize: 20, lineHeight: 20, fontWeight: "bold", ...(center ? { alignSelf: 'center' } : {}) }}
					{...rest}
				>
					{title}
				</Text>
			}

			{label &&
				<Text
					style={{ fontFamily: 'Inter', fontSize: 20, lineHeight: 20, fontWeight: "normal", ...(center ? { alignSelf: 'center' } : {}) }}
					{...rest}
				>
					{label}
				</Text>
			}
		</View >
	)
}