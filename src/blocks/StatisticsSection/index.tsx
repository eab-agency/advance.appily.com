import RichText from "@/components/RichText";
import StatCard from "@/components/StatCard/StatCard";
// import styles from "@/styles/components/Stats.module.scss";
import '@/styles/components/modules/StatsSection.scss'
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
    <section className={`${sectionClassNames({ backgroundColor: statsBackgroundColor, layoutWidth: statsLayoutWidth })} stats`}>
      <div className="group">
        <ul className="stats-list">
          {statistics?.map((stat, _index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li className="stats-list__item" key={_index}>
              <StatCard {...stat} />
            </li>
          ))}
        </ul>
        <p className="source">{source}</p>
      </div>
    </section>
  );
}

export default StatisticsSection;
