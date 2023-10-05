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
		<>
			<h2>{title}</h2>
			<p>{description}</p>
			<ul>
				{paths.map(path => (
					<li key={path.title}>
						<Image
							src={path.imagePath}
							width={340}
							height={240}
							alt={path.title}
						/>
						<h3>{path.title}</h3>
						<p>{path.description}</p>
					</li>
				))}
			</ul>
		</>
	);
}
