
interface FactsCardProps {
  className?: string;
  color?: "teal" | "yellow" | "orange" | "violet";
  title: string;
  description: string;
  source?: string;
  headingLevel?: "h2" | "h3" | "h4" | "h5";
}

export const FactsCard = ({ color, title, description, source, className, headingLevel = "h3" }: FactsCardProps) => {
  let highlightColor = "teal";
  switch (color) {
    case "teal":
      highlightColor= "bg-brand-teal";
      break;
    case "yellow":
      highlightColor = "bg-brand-yellow";
      break;
    case "orange":
      highlightColor = "bg-brand-orange";
      break;
    case "violet":
      highlightColor = "bg-brand-violet";
      break;
  }

  const HeadingTag = headingLevel;

  return (
    <div className={`facts-card flex flex-col gap-lg max-w-prose flex-1 ${className}`}>
      <HeadingTag className={`${highlightColor} py-fluid-xs px-fluid-md transform -skew-x-10 -rotate-[0.5deg] rounded-sm mx-auto my-auto text-center w-full flex items-center justify-center`}>
        <span className="inline-block text-brand-navy-blue transform skew-x-10 rotate-[0.5deg] relative text-fluid-lg font-extrabold leading-tight">{title}</span>
      </HeadingTag>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      {source && <small className="italic">{source}</small>}
    </div>
  )
}
