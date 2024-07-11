export interface SectionClassNamesProps {
	backgroundColor?: string | null | undefined;
	enableHighlight?: boolean | null;
	layoutWidth?: string | null;
}

export function sectionClassNames({
	backgroundColor,
	enableHighlight,
	layoutWidth,
}: SectionClassNamesProps): string {
	const classNames = ["section-content"];

	if (enableHighlight) {
		classNames.push("section__highlight");
	}
	if (layoutWidth) {
		classNames.push(`section__layoutwidth-${layoutWidth}`);
	}
	if (backgroundColor && backgroundColor !== "default") {
		classNames.push(`section__bg-${backgroundColor}`);
	}
	return classNames.join(" ");
}
