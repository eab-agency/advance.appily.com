import styles from "@/styles/global/components/Stats.module.scss";

/* eslint-disable react/no-danger */
function Stats({ stats, source, className = "" }) {
	return (
		<section className={`${styles.stats} ${className}`}>
			<ul>
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
		</section>
	);
}

export default Stats;
