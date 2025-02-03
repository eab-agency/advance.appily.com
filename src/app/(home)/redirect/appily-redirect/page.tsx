import { Button } from "@/components";

export default function AppilyRedirect() {
  return (
    <section className="columns">
      <div className="group column center-aligned narrow">
        <h1>Find the Right Resources For High School Students</h1>
        <p>
          Based on your age range, we think you’ll find more helpful resources on
          the main <a href="https://appily.com" target="_blank" rel="noreferrer" >Appily site</a>. These include:
        </p>
        <ul>
          <li>A robust school search</li>
          <li>Virtual tours</li>
          <li>Scholarships</li>
          <li>Career quizzes</li>
        </ul>
        <Button
          className="button btn-primary"
          appearance="primary"
          href="https://www.Appily.com"
          label="Go to Appily.com"
        />
      </div>
    </section>
  );
}
