import { Button } from "@/components";
import Image from "next/image";
import { FactsCard } from "../components/FactsCard";
import { FunCard } from "../components/FunCard";
import { Hero } from "../components/Hero";
import { PageFooter } from "../components/PageFooter";
import { PageHead } from "../components/PageHead/PageHead";

import CommonQuestions from "../assets/common-questions.png";
import heroImage from '../assets/healthcare-hero.jpg';
import ElevateYourCareer from "../assets/healthcare-professional.jpg";

export default function Page() {
  return (
    <>
      <PageHead />
      <Hero
        title="Boost Your Career in the Medical Field with the Right Advanced Degree"
        image={heroImage}
      />

      <section className="container-wide px-fluid-lg py-fluid-5xl flex flex-col md:flex-row gap-fluid-4xl items-start relative">
        <div className="md:w-3/5">
          <h2>Find Your Perfect Path: Explore Jobs in the Medical Field with Our Career Quiz</h2>
          <p>Are you wondering "What medical career is right for me?" or "What should I do in the medical field?" Whether you're interested in high-paying medical jobs or exploring different careers in the medical field, our free medical specialty quiz can guide you toward the best options based on your skills and interests. With countless job opportunities available in the ever-growing medical field, now is the time to discover which career suits you best!</p>
        </div>
        <FunCard className="shadow-md-orange" color="teal">
          <h3>Take the Next Step</h3>
          <p>Not sure which pathway or graduate degree is right for you? Our career quiz can help identify the best option based on your skills and interests. </p>
          <Button label="Start the Quiz Now" appearance="primary" href="https://my.appily.com/register/adult/healthcarecareers1/degree" className="button" />
        </FunCard>

      </section>

      <section className="bg-brand-navy-blue text-white py-fluid-5xl px-fluid-2xl facts">
        <div className="container-wide">
          <h2 className="block text-center">Why Pursue a Career in Medicine?</h2>
          <p className="text-center mb-fluid-3xl container-default">Medical careers offer more than just financial stability—they provide the opportunity to make a real difference in people&apos;s lives. Whether you're considering different jobs in the medical field or looking for medical jobs that pay well, a career in medicine allows you to contribute to society while enjoying personal and professional growth.</p>
          <div className="flex flex-col md:flex-row gap-fluid-4xl items-start">
            <FactsCard
              headingLevel="h3"
              color="yellow"
              title="High Earning Potential"
              description="Many roles in the medical field offer above-average salaries."
            />
            <FactsCard
              headingLevel="h3"
              color="violet"
              title="Job Stability"
              description="With the continuous demand for health care professionals, medical jobs provide long-term security."

            />
            <FactsCard
              headingLevel="h3"
              color="teal"
              title="Diverse Opportunities"
              description="Whether you want to work directly with patients, behind the scenes, or in a leadership role, there are countless career pathways in the medical field."

            />

          </div>
        </div>
      </section>

      <section className="py-fluid-5xl px-fluid-2xl">
          <div className="container-wide flex flex-col md:flex-row gap-fluid-4xl items-start">
            <div>
              <h2 className="block">Explore Different Professions in the Medical Field</h2>
              <p className="mb-fluid-3xl">The medical field offers a wide range of rewarding careers, from direct patient care to administrative and technology-focused roles. Whether you're curious about medical health jobs or want to explore different jobs in the medical field, there&apos;s a perfect path for everyone.</p>

              <h3 className="font-sans text-fluid-lg mb-0">High-Demand Medical Careers</h3>
              <p>According to industry statistics, medical field jobs are among the fastest-growing and most in-demand. Whether you want to work in patient care or behind the scenes in medical research or administration, the opportunities are endless.</p>
            </div>
            <FunCard color="violet" className="bg-white w-full md:w-[48%] flex-none">
              <h3>Popular Medical Health Jobs:</h3>
              <ul className="list-disc pl-6">
                <li><strong>Nursing Careers:</strong> From registered nurses (RNs) to advanced practice nurses, nursing offers numerous advancement opportunities.</li>
                <li><strong>Medical Technologists:</strong> Perform vital tests that help in diagnosing and treating patients.</li>
                <li><strong>Pharmacy Careers:</strong> Work as a pharmacist or pharmacy technician and play a critical role in health care delivery.</li>
                <li><strong>Therapists:</strong> Explore roles such as respiratory or occupational therapy, which provide hands-on patient care.</li>
                <li><strong>Medical Administration:</strong> Lead hospital departments, manage medical facilities, or coordinate health services.</li>
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
            alt="Find the Best Medical Field Jobs for You"
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            />
        </figure>

        <div className="container-wide z-10 relative py-[7vw]">
          <FunCard color="yellow" className="bg-white w-full md:w-[48%] flex-none">
            <h2>Find the Best Medical Field Jobs for You</h2>
            <p>If you're asking yourself, "What medical career is best for me?", our medical specialty quiz will help you discover roles tailored to your interests. Whether you&apos;re looking for medical jobs that pay well or considering a career change, the quiz provides personalized suggestions for your next steps.</p>
            <h3 className="font-sans text-fluid-lg mb-0">Top-Paying Jobs in the Medical Field</h3>
            <p>Looking for jobs in the medical field that pay well? Many careers in medicine offer competitive salaries and strong growth potential. Explore roles in:</p>
            <p><strong>Physician & Surgeon Careers:</strong> These highly skilled roles offer some of the best medical field jobs in terms of compensation.</p>
            <p><strong>Specialist Nurses:</strong> Nurse practitioners, anesthetists, and midwives can earn high salaries while delivering specialized care.</p>
            <p><strong>Medical Research:</strong> Conduct groundbreaking research that improves patient outcomes and advances medical science.</p>
          </FunCard>
        </div>

      </section>

      <section className="bg-brand-lightteal py-fluid-5xl px-fluid-2xl">
        <div className="container-wide flex flex-col gap-fluid-4xl items-start md:flex-row">
          <figure className="w-full md:w-1/2">
            <Image
              src={CommonQuestions}
              alt="Common Questions About Medical Careers"
              quality={85}
              className="object-cover"
              width={800}
              height={533}
              layout="responsive"
            />
          </figure>
          <div className="w-full md:w-1/2">
            <h2>Common Questions About Medical Careers</h2>
            <div>
              <h3 className="mb-0 font-sans font-bold">How can I find out which medical career is right for me?</h3>
              <p>Taking a career quiz is a great way to discover roles that match your interests, skills, and long-term goals.</p>

              <h3 className="mb-0 font-sans font-bold">Are there high-demand jobs in the medical field?</h3>
              <p>Yes, medical field jobs are in high demand due to the growing need for health care services. The Bureau of Labor Statistics predicts about two million jobs in health care will be created each year over the next decade.</p>

              <h3 className="mb-0 font-sans font-bold">What is the best way to start a career in medicine?</h3>
              <p>Start by identifying your interests—whether it's patient care, technology, or administration—then take our career quiz to explore suitable pathways and be connected with schools who offer the required degrees to help you meet your goals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-brand-navy-blue bg-[url(/images/darkblue-texture.svg)] text-white py-fluid-5xl px-fluid-2xl text-center before:bg-brand-navy-blue before:content-[''] before:absolute before:inset-0 before:z-1 before:opacity-80">
        <div className="container-default relative z-10">
          <h2>Ready to Take the Next Step?</h2>
          <p className="text-fluid-lg">Start your journey toward a fulfilling career by taking our medical careers quiz today! Discover which roles align with your skills, interests, and goals—whether you're exploring jobs in the medical field, considering medical field jobs that pay well, or searching for different medical field careers.</p>
          <p className="text-fluid-lg">Take the free quiz now and find out what medical career is best for you. Your future in the medical field starts here!</p>
          <Button label="Start the Free Medical Career Quiz" appearance="primary" href="https://my.appily.com/register/adult/healthcarecareers1/degree" className="button mx-auto" />
        </div>
      </section>

      <PageFooter />

    </>
  );
}
