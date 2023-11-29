import Link from "next/link";

export default function AppilyRedirect() {
	return (
		<>
			<h1>Find the Right Resources For Your Journey</h1>
			<p>Based on your answer, you may find these resources more useful:</p>

			<p>
				Current college students who are interested in{" "}
				<strong>transferring</strong> will find the most relevant content on{" "}
				<a href="https://www.Appily.com">Appily.com</a>. This quiz focuses more
				on nontraditional students who may be returning to school after a gap.
			</p>
			<p>
				If you’re looking for a graduate degree or professional licensure, you
				may find our <Link href="/careers/">Career Quizzes</Link> to be more
				relevant. This quiz focuses primarily on bachelor’s degrees.
			</p>
		</>
	);
}
