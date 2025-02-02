interface FunCardProps {
  className?: string;
  children: React.ReactNode;
  color?: "teal" | "yellow" | "orange" | "navy-blue" | "violet";
}

export const FunCard = ({ className = "", color, children }:FunCardProps) => {
  let cardColor = "shadow-md-yellow border-brand-yellow";

  if(color){
    switch (color) {
      case "teal":
        cardColor= "shadow-md-teal border-brand-teal";
        break;
      case "yellow":
        cardColor = "shadow-md-yellow border-brand-yellow";
        break;
      case "orange":
        cardColor = "shadow-md-orange border-brand-orange";
        break;
      case "navy-blue":
        cardColor = "shadow-md-darknavy border-brand-navy-blue";
        break;
      case "violet":
        cardColor = "shadow-md-violet border-brand-violet";
        break;
    }
  }

  return (
    <div
      className={`block flex-1 p-fluid-xl border-2 rounded-lg ${cardColor} ${className}`}
    >
      {children}
    </div>
  );
};
