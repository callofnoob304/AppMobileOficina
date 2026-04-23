import { View, ViewProps } from "react-native";
import React from "react";

type Props = ViewProps & {
	children?: React.ReactNode;
};

export default ({ children, ...rest }: Props) => {
	return (
		<View style={{ flex: 1, padding: 24 }} {...rest}>
			{children}
		</View>
	);
}
