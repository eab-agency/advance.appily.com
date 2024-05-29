import styles from "@/styles/components/Stats.module.scss";
import RichText from "../RichText";

interface StatCard {
  number: string;
  title?: string;
  richText: {
    [k: string]: unknown;
  }[];
}

/* eslint-disable react/no-danger */
function StatCard({ number, title, richText }: StatCard) {
  return (
    <div className="stat-card">
      <h3>
        <strong>{number}</strong>
        <span>{title}</span>
      </h3>
      <RichText content={richText} />
    </div>
  );
}

export default StatCard;
