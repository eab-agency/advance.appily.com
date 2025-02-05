import { Button } from "@/components";
import Image from "next/image";
import { FactsCard } from "../components/FactsCard";
import { FunCard } from "../components/FunCard";
import { Hero } from "../components/Hero";
import { PageFooter } from "../components/PageFooter";
import { PageHead } from "../components/PageHead/PageHead";

import heroImage from '../assets/healthcare-hero.jpg';
import ElevateYourCareer from "../assets/healthcare-professional.jpg";

export default function Page() {
  return (
    <>
      <PageHead />
      <Hero
        title="Advance Your Nursing Career: Take Our Free Health Care Career Quiz"
        image={heroImage}
      />

      <section className="container-wide px-fluid-lg py-fluid-5xl flex flex-col md:flex-row gap-fluid-4xl items-start relative">
        <div className="md:w-3/5">
          <h2>Discover Specialized Nursing Roles and Unlock New Opportunities</h2>
          <p>Are you a registered nurse (RN) wondering "Should I pursue an advanced nursing degree?" or "What nursing career is right for me?" With health care evolving rapidly, now is the perfect time to explore different nursing jobs that may require advanced education and offer greater autonomy, higher salaries, and leadership opportunities. Our career quiz is designed to help you identify the best path forward, whether you want to become a nurse practitioner, a clinical specialist, or a nurse leader.</p>
        </div>
        <FunCard className="shadow-md-orange" color="teal">
          <h3>Take the Next Step </h3>
          <p>If you want to advance your career, our health care quiz can help you identify career paths and educational opportunities that get you to the next level.</p>
          <p>The quiz provides personalized guidance based on your experience, interests, and long-term career goals and connects you to nursing schools, colleges, and universities with programs that align to your needs.</p>
          <Button label="Start the Quiz Now" appearance="primary" href="https://my.appily.com/register/adult/healthcarecareers1/degree" className="button" />
        </FunCard>

      </section>

      <section className="bg-brand-navy-blue text-white py-fluid-5xl px-fluid-2xl facts">
        <div className="container-wide">
          <h2 className="block text-center">Why Advance Your Nursing Career?</h2>
          <p className="text-center mb-fluid-3xl container-default">Advanced nursing degrees open doors to specialized roles, leadership positions, and higher earning potential. Whether you want to provide more comprehensive care, lead health care teams, or contribute to health care innovation, advancing your nursing career allows you to make a broader impact.</p>
          <div className="flex flex-col md:flex-row gap-fluid-4xl items-start">
            <FactsCard
              headingLevel="h3"
              color="yellow"
              title="Increased Autonomy"
              description="Advanced practice nurses often work independently, managing patient care without direct supervision."
            />
            <FactsCard
              headingLevel="h3"
              color="violet"
              title="Higher Salaries"
              description="Specialized nursing jobs typically come with significantly higher compensation."

            />
            <FactsCard
              headingLevel="h3"
              color="teal"
              title="Leadership Opportunities"
              description="Advanced degrees qualify you for administrative and leadership roles in health care."

            />

          </div>
        </div>
      </section>

      <section className="py-fluid-5xl px-fluid-2xl">
          <div className="container-wide flex flex-col md:flex-row gap-fluid-4xl items-start">
            <div>
              <h2 className="block">Explore Advanced Jobs in Nursing</h2>
              <p className="mb-fluid-3xl">If you're ready to advance your career beyond your RN degree, advanced roles can offer exciting new challenges and opportunities. These positions often require specialized graduate degrees, enabling you to take on greater responsibilities in patient care, administration, and health care innovation.</p>
            </div>
            <FunCard color="violet" className="bg-white w-full md:w-[48%] flex-none">
              <h3>Advanced Nursing Career Paths:</h3>
              <ul className="flex flex-col gap-fluid-md">
                <li><strong>Nurse Practitioner (NP):</strong> Provide primary and specialty care, diagnose and treat illnesses, and prescribe medications.</li>
                <li><strong>Clinical Nurse Specialist (CNS):</strong> Focus on improving patient outcomes through specialized expertise in a particular area of practice.</li>
                <li><strong>Nurse Anesthetist (CRNA):</strong> Deliver anesthesia during surgeries and procedures, a highly specialized and in-demand role.</li>
                <li><strong>Nurse Midwife (CNM):</strong> Offer comprehensive care to women, including prenatal, labor, and postnatal services.</li>
                <li><strong>Nursing Administrators:</strong> Lead health care teams and manage nursing operations at hospitals and other health care facilities.</li>
              </ul>
            </FunCard>
          </div>
      </section>

      <section className="relative flex flex-col bg-[#bcc5c0]  md:petal-brand-yellow petal-left-0 petal-tr-100 petal-top-0 petal-square-h-100 lg:petal-square-w-50 overflow-hidden">

        <figure
        className="w-full h-[80vw] -mb-[40vw] relative top-0 right-0 md:absolute lg:w-2/3 md:h-full z-0"
        >
          <Image
            src={ElevateYourCareer}
            alt="Choosing the Right Registered Nurse Degree Advancement Program"
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            />
        </figure>

        <div className="container-wide z-10 relative py-[7vw]">
          <FunCard color="yellow" className="bg-white w-full md:w-[48%] flex-none">
            <h2>Choosing the Right Registered Nurse Degree Advancement Program</h2>
            <p>To take on advanced roles, you’ll need to enroll in a graduate-level registered nurse degree program. Depending on your chosen path, options include master’s and doctoral programs in nursing.</p>
            <h3 className="font-sans text-fluid-lg">Key Considerations for Advanced Nursing Programs:</h3>
            <p><strong>Specializations:</strong> Choose a program that aligns with your desired advanced nursing role, whether it's family practice, acute care, or nursing leadership.</p>
            <p><strong>Flexibility:</strong>  Many programs offer part-time, online, or hybrid options, making it easier to balance work and education.</p>
            <p><strong>Licensure and Certification:</strong> Advanced roles often require additional certifications beyond a graduate degree, such as NP or CRNA licensure.</p>
          </FunCard>
        </div>

      </section>

      <section className="relative bg-brand-navy-blue bg-[url(/images/darkblue-texture.svg)] text-white py-fluid-5xl px-fluid-2xl text-center before:bg-brand-navy-blue before:content-[''] before:absolute before:inset-0 before:z-1 before:opacity-80">
        <div className="container-default relative z-10">
          <h2>Ready to Take the Next Step?</h2>
          <p className="text-fluid-lg">Start your journey toward a fulfilling career by taking our health care careers quiz today! Discover which roles align with your skills, interests, and goals—whether you're focused on advancing your current nursing career or are exploring other jobs in the health care field, this quiz will ensure you are on the right path. Once you have completed the quiz, we will connect you to nursing schools with programs that can help you earn the degrees required to advance your career.</p>

          <Button label="Start the Free Business Career Quiz" appearance="primary" href="https://my.appily.com/register/adult/healthcarecareers1/degree" className="button mx-auto" />
        </div>
      </section>

      <PageFooter />

    </>
  );
}
