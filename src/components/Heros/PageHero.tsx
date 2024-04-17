import Image from "next/image";

interface PageHeroProps {
  image: {
    src: string;
    alt: string;
  };
  children?: React.ReactNode;
}

export default function PageHero({ image, children }: PageHeroProps) {
  return (
    <section className="pageHero">
      <div className="group center-aligned center-justified">
        <div className="content-container">{children}</div>
        <figure className="heroImage" style={{ height: 672, width: 672 }}>
          <Image
            src={image.src}
            width={672}
            height={672}
            alt={image.alt}
            priority={true}
          />
        </figure>
      </div>
    </section>
  );
}
