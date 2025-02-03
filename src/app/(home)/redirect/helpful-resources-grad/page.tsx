import Link from "next/link";

export default function AppilyRedirect() {
	return (
		<section className="columns">
			<div className="group column center-aligned narrow">
				<h1>Find the Right Resources For Your Journey</h1>
				<p>Based on your answer, you may find these resources more useful:</p>

				<p>
					If you’re looking for a graduate degree or professional licensure, you
					may find our <Link href="/careers/">Career Quizzes</Link> to be more
					relevant.
				</p>
				<p>
					This readiness quiz focuses primarily on the undergraduate experience.
				</p>
			</div>
		</section>
	);
}
