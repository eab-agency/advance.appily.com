import RichText from "@/components/RichText";
import styles from "@/styles/components/Stats.module.scss";

interface StatsProps {
  blockType? : string;
  statistics: Stat[];
  stats: Stat[];
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
function Statistic(block: StatsProps) {
const {statistics, source} = block;
  return (
    <section className={`${styles.stats}`}>
      <div className="group center-aligned">
        <ul className="group center-aligned">
          {statistics?.map((stat, _index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li key={_index}>
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

export default Statistic;
