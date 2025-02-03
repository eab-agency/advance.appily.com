
import Image from 'next/image';

export const PreFooter = () => {
  return (
    <section className="py-fluid-5xl px-fluid-2xl text-center">
        <div className="container-narrow">
          <h2>Your Path to Success Starts Here!</h2>
          <p><a href="https://advance.appily.com/" target='_blank'>Appily Advance</a> can support your journey to success—whether you want to pursue graduate studies, explore a new career, or finish your undergraduate degree. Take our free career quizzes in business, education, and health care, and get expert insights that help you achieve your goals with confidence. Start building your future today.</p>
          <figure className="relative mx-auto mt-fluid-3xl" style={{ width: 'clamp(14rem, 25vw,22rem)', height: 'clamp(3rem,7vw,7rem)' }}>
            <Image
              src="./images/Appily-Advance-Horizontal-Logo.svg"
              alt="Appily Advance Logo"
              fill
              sizes="(max-width: 640px) 100vw, 80vw"
              unoptimized
            />
          </figure>
        </div>
      </section>
  )
}
