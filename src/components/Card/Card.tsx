import React from "react";

import classes from "./index.module.scss";

export type IconType = "ROI" | "starburst" | "misc";

export const Card: React.FC<{
	alignItems?: "center";
	className?: string;
	hideImagesOnMobile?: boolean;
	title?: string;
	children?: React.ReactNode;
	icon?: IconType;
}> = props => {
	const { title: titleFromProps, className, children, icon = "ROI" } = props;

	return (
		<div className={[classes.card, className].filter(Boolean).join(" ")}>
			{titleFromProps && <h4 className={classes.title}>{titleFromProps}</h4>}
			{children && (
				<div className={classes.description}>{children && children}</div>
			)}
		</div>
	);
};
