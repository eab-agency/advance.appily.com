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
    <section className={`textWithImage ${className}`}>
      <div className="group cols-2">
        <figure className="highlighted-img">

          {imagePath && <Image src={imagePath} height={300} width={250} alt="" />}
        </figure>
        <div className="textContainer column" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
};
