import styles from "@/styles/components/Stats.module.scss";

/* eslint-disable react/no-danger */
function Stats({ stats, source, className = "" }) {
	return (
		<section className={`${styles.stats} ${className}`}>
      <div className="group center-aligned">
			<ul className="group center-aligned">
				{stats.map((stat, _index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<li key={_index}>
						<h3>
							<strong>{stat.number}</strong>
							{stat.title}
						</h3>
						<p
							dangerouslySetInnerHTML={{
                __html: stat.description,
							}}
              />
					</li>
				))}
			</ul>
			<p className={styles.source}>{source}</p>
        </div>
		</section>
	);
}

export default Stats;
