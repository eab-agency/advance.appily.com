import styles from "@/styles/components/Stats.module.scss";
import RichText from "../RichText";

interface Stat {
  number: string;
  title?: string;
  richText: {
    [k: string]: unknown;
  }[];
}

/* eslint-disable react/no-danger */
function Stats({ number, title, richText }: Stat) {
  return (
    <div>
      <h3>
        <strong>{number}asdf</strong>

      </h3>
      <span>{title}</span>
      <RichText content={richText} />
    </div>
  );
}

export default Stats;
