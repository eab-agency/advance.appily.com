import Image from "next/image";
import React from "react";

type InnerHTMLComponentProps = {
	content: string;
	imagePath?: string;
	className?: string;
};

export const TextWithImage: React.FC<InnerHTMLComponentProps> = ({
	content,
	imagePath,
	className,
}) => {
	return (
		<div className={className}>
			{imagePath && <Image src={imagePath} height={300} width={250} alt="" />}
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
};
