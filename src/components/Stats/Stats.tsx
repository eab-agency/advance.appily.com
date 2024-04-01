import styles from "@/styles/components/Stats.module.scss";
import RichText from "../RichText";

interface StatsProps {
  stats: Stat[] | Stat; // Update the type of stats prop to accept either an array of Stat or a single Stat object
  source?: string;
  className?: string;
}

interface Stat {
  number: string;
  title?: string;
  richText: {
    [k: string]: unknown;
  }[];
}

/* eslint-disable react/no-danger */
function Stats({ stats, source, className = "" }: StatsProps) {
  // Convert stats to an array
  const statsArray: Stat[] = Array.isArray(stats) ? stats : [stats];

  return (
    <section className={`${styles.stats} ${className}`}>
      <div className="group center-aligned">
        <ul className="group center-aligned">
          {statsArray.map((stat, index) => (
            <li key={index}>
              <h3>
                <strong>{stat.number}</strong>
                {stat.title}
              </h3>
              <RichText content={stat.richText} />
            </li>
          ))}
        </ul>
        <p className={styles.source}>{source}</p>
      </div>
    </section>
  );
}

export default Stats;
