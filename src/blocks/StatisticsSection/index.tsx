import RichText from "@/components/RichText";
import styles from "@/styles/components/Stats.module.scss";
import { sectionClassNames } from '@/utilities/sectionClassNames'

interface StatsProps {
  blockType?: string;
  statistics: Stat[];
  stats: Stat[];
  source?: string;
  className?: string;
  statsBackgroundColor?: string;
  statsLayoutWidth?: string;
}

interface Stat {
  number: string;
  title?: string;
  richText: {
    [k: string]: unknown;
  }[];
}

/* eslint-disable react/no-danger */
function StatisticsSection(block: StatsProps) {
  const {
    statsBackgroundColor,
    statsLayoutWidth,
    statistics,
    source
  } = block;



  return (
    <section className={`${sectionClassNames({ backgroundColor: statsBackgroundColor, layoutWidth: statsLayoutWidth })} ${styles.stats}`}>
      <div className="group">
        <ul className="stats-list">
          {statistics?.map((stat, _index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li className="stats-list__item" key={_index}>
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

export default StatisticsSection;
