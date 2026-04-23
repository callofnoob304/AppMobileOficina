import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Label from "./Label";
import React from "react";

interface ButtonProps extends TouchableOpacityProps {
	bgColor?: string;
	title: string;
}

export default ({ title, bgColor, ...rest }: ButtonProps) => {
	return (
		<TouchableOpacity
			style={{ width: "100%", padding: 8, borderRadius: 24, backgroundColor: bgColor }}
			activeOpacity={0.75}
			{...rest}
		>
			<Label center label={title} />
		</TouchableOpacity>
	)
}