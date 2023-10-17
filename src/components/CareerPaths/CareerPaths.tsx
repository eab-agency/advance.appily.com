import Image from "next/image";

interface CareerPath {
  imagePath: string;
  title: string;
  description: string;
}

interface CareerPathsProps {
  careerPaths: {
    title: string;
    description: string;
    paths: CareerPath[];
  };
}

export function CareerPaths({ careerPaths }: CareerPathsProps) {
  const { title, description, paths } = careerPaths;
  return (
    <section className="careerPaths">
      <div className="group column">
        <div className="intro-text">
          <h2>{title}</h2>
          {/* <p>{description}</p> */}
          <p
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </div>
        <ul className="thePaths">
          {paths.map(path => (
            <li key={path.title}>
              <figure>
                <Image
                  src={path.imagePath}
                  width={340}
                  height={240}
                  alt={path.title}
                />
              </figure>
              <div className="careerPathContent">
                <h3>{path.title}</h3>
                <p>{path.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
