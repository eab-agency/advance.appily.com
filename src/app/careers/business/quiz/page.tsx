import { Button } from "@/components";
import styles from "@/styles/global/layouts/EmailOnly.module.scss";
import Head from "next/head";
import Image from "next/image";
// eslint-disable-next-line import/no-unresolved

export default function QuizLandingPage() {
	return (
		<>
			<Head>
				<title>Define Your Future in Health Care | Health Science Quiz</title>
				<meta name="description" content="Appily Health Science Quiz" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.png" />
			</Head>
			<main className="short landing">
				<div className="content-wrapper">
					<div className={styles.container}>
						<div className={styles.content}>
							<header>
								{/* <MainLogo /> */}
								<h1>
									Forge Your Path <strong>in Business</strong>
								</h1>
							</header>
							<p>
								If you want to work in business but you don’t know which job
								fits your skills and interests,{" "}
								<strong>this free quiz can help find a good fit</strong> and you
								plan your next steps.
							</p>
							<p>
								The Bureau of Labor Statistics predicts about X million jobs in
								business will be created each year over the next decade. Many
								colleges and universities offer flexible, affordable degrees or
								certificates that can help you get a head start in transferring
								your skills to a new or more advanced role.
							</p>
							<p>
								In less than three minutes, you could discover which type of
								business career could be a good fit for you. We’ll also connect
								you with schools near you that offer degrees to help you reach
								your goals..
							</p>
							<Button
								label="Take the Quiz"
								appearance="primary"
								href="/careers/business/quiz/start"
							/>
						</div>
						<figure className={styles["deco-image"]}>
							<Image
								src="/images/cappex-define-your-future-img.jpg"
								alt="Define Your Future in Business"
								// fill
								width={500}
								height={600}
							/>
						</figure>
					</div>
				</div>
			</main>
		</>
	);
}