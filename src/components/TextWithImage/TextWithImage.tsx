import Image from "next/image";
import React from "react";

type InnerHTMLComponentProps = {
  content: string;
  imagePath?: string;
  className?: string;
  altText?: string;
};

export const TextWithImage: React.FC<InnerHTMLComponentProps> = ({
  content,
  imagePath,
  className,
  altText,
}) => {
  return (
    <section className={`textWithImage ${className}`}>
      <div className="group cols-2">
        <figure className="highlighted-img">
          {imagePath && <Image src={imagePath} height={800} width={800} alt={altText ?? ''} />}
        </figure>
        <div className="textContainer column" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
};
