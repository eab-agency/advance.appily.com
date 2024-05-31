import '@/styles/components/modules/StatCard.scss'
import RichText from "../RichText";

interface StatCard {
  number: string;
  title?: string;
  richText: {
    [k: string]: unknown;
  }[];
  description?: string; //Note Andrei: this prop was added to solve the issue for static pages. Once all pages are dynamic, this prop can be removed.
}

/* eslint-disable react/no-danger */
function StatCard({ number, title, richText, description }: StatCard) {
  return (
    <div className="stat-card">
      <h3>
        <strong>{number}</strong>
        <span>{title}</span>
      </h3>
      {description ?
        <p dangerouslySetInnerHTML={{ __html: description }} />
        //Note Andrei: this prop was added to solve the issue for static pages. Once all pages are dynamic, this prop can be removed.

        : <RichText content={richText} />}

      {/* //Note Andrei this should be render when all pages are dynamic <RichText content={richText} /> */}
    </div>
  );
}

export default StatCard;
