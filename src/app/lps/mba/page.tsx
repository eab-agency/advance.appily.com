/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components";
import Image from "next/image";
import { HiBadgeCheck } from "react-icons/hi";
import { FactsCard } from "../components/FactsCard";
import { FunCard } from "../components/FunCard";
import { Hero } from "../components/Hero";
import { PageFooter } from "../components/PageFooter/PageFooter";
import { PageHead } from "../components/PageHead/PageHead";
import { StickyCta } from "../components/StickyCta";


// @ts-ignore
import CommonQuestions from "../assets/common-questions.png";
// @ts-ignore
import ElevateYourCareer from "../assets/elevate-your-career.jpg";
// @ts-ignore
import heroImage from "../assets/mba-hero.jpg";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earn Your Master of Business Administration",
  description:
    "Find the right MBA for your goals. Take our quiz to explore MBA degrees in finance, management, leadership, and more. Unlock your career potential today!",
  openGraph: {
    title: "Earn Your Master of Business Administration",
    description:
      "Find the right MBA for your goals. Take our quiz to explore MBA degrees in finance, management, leadership, and more. Unlock your career potential today!",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/business`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/mba-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "A group of business professionals discussing a project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn Your Master of Business Administration",
    description:
      "Find the right MBA for your goals. Take our quiz to explore MBA degrees in finance, management, leadership, and more. Unlock your career potential today!",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/images/mba-hero.jpg`],
  },
};

export default function Page() {
  return (
    <>
      <PageHead />
      <Hero
        title="Unlock Your Career Potential with an MBA"
        description="Discover How an MBA Can Transform Your Future in Business, Finance, and Leadership"
        image={heroImage}
        altText="A group of business professionals discussing a project"
      />

      <section className="container-wide px-fluid-lg py-fluid-5xl flex flex-col md:flex-row gap-fluid-4xl items-start relative">
        <div className="md:w-3/5">
          <h2>
            Are You Ready to Take the Next Step in Your Professional Journey?
          </h2>
          <p>
            Earning a Master's in Business Administration can provide the
            skills, knowledge, and network you need to unlock new career
            opportunities. If you&apos;re wondering "Should I get an MBA?" or
            "What can I do with an MBA?", our interactive quiz can help guide
            you in the right direction.
          </p>

          <h3>Why Pursue an MBA?</h3>
          <ul className="flex flex-col gap-fluid-lg">
            <li className="flex gap-fluid-sm">
              <HiBadgeCheck className="text-brand-teal text-3xl shrink-0" />
              <div>
                <strong>Broaden Your Career Horizons:</strong> MBA degrees can
                lead to roles in senior management, consulting, or
                entrepreneurship.
              </div>
            </li>
            <li className="flex gap-fluid-sm">
              <HiBadgeCheck className="text-brand-teal text-3xl shrink-0" />
              <div>
                <strong>Specialize in High-Demand Fields:</strong> MBA degree
                programs are designed to support careers in a range of
                industries such as finance, marketing, project
                management/operations, information technology, analytics, and
                organizational leadership, just to name a few!
              </div>
            </li>
            <li className="flex gap-fluid-sm">
              <HiBadgeCheck className="text-brand-teal text-3xl shrink-0" />
              <div>
                <strong>Gain a Competitive Edge:</strong> MBA graduates often
                enjoy higher salaries and better job prospects.
              </div>
            </li>
          </ul>
        </div>
        <FunCard className="shadow-md-orange" color="teal">
          <h3>Take our Free Career Quiz </h3>
          <p>Let us help you find the best MBA business program!</p>
          <Button
            label="Get Started"
            appearance="primary"
            href="https://my.appily.com/register/adult/businesscareers1/degree"
            className="button"
          />
        </FunCard>
      </section>

      <section className="bg-brand-navy-blue text-white py-fluid-5xl px-fluid-2xl facts">
        <div className="container-wide">
          <h2 className="block text-center">Is Earning an MBA Worth It?</h2>
          <div className="flex flex-col md:flex-row gap-fluid-4xl items-start">
            <FactsCard
              headingLevel="h3"
              color="yellow"
              title="Employment Rate"
              description="USC Marshall reports that approximately 97% of their full-time MBA graduates secured employment within three months postgraduation with an average base salary exceeding $150k."
              source="Marshall School of Business"
            />
            <FactsCard
              headingLevel="h3"
              color="violet"
              title="Salary-to-Debt Ratio"
              description="Many MBA programs across the United States have a high ROI. At some schools, graduates earn salaries that exceed 216% of their student debt, which indicates a substantial return on investment."
              source="U.S. News & World Report"
            />
            <FactsCard
              headingLevel="h3"
              color="teal"
              title="Startup Initiatives"
              description="There's a notable trend of MBA graduates, especially older alumni, leveraging their degrees to launch start-ups, with over 40% of graduates aged 54 and above starting their own companies."
              source="Financial Times"
            />
          </div>
        </div>
      </section>

      <section className="py-fluid-5xl px-fluid-2xl">
        <div className="container-wide">
          <h2 className="block text-center">
            Explore MBA Program Specializations
          </h2>

          <div className="flex flex-wrap justify-center gap-fluid-2xl items-start">
            <FunCard
              color="teal"
              className="w-full md:w-[48%] lg:w-[30%] flex-none"
            >
              <h3 className="mt-auto">MBA in Finance</h3>
              <p>
                Advance your financial acumen and pursue roles in investment,
                corporate finance, or financial consulting.
              </p>
              <p>
                <strong>Related Specializations:</strong>
              </p>
              <ul className="list-disc list-outside pl-fluid-lg text-fluid-sm">
                <li>Accounting</li>
                <li>Business Economics</li>
                <li>Banking and Financial Support Services</li>
                <li>Investments and Securities</li>
                <li>Taxation</li>
              </ul>
            </FunCard>

            <FunCard
              color="yellow"
              className="w-full md:w-[48%] lg:w-[30%] flex-none"
            >
              <h3 className="mt-auto">
                MBA in Management or MBA in Organizational Leadership
              </h3>
              <p>
                Gain the skills to lead teams and manage complex initiatives
                across industries. Prepare for executive roles and become a
                leader who inspires change.
              </p>
              <p>
                <strong>Related Specializations:</strong>
              </p>
              <ul className="list-disc list-outside pl-fluid-lg text-fluid-sm">
                <li>Executive Business Administration</li>
                <li>Business Administration</li>
                <li>International Business/Trade/Commerce</li>
                <li>Risk Management</li>
                <li>Office Management and Supervision</li>
                <li>Nonprofit/Public Organizational Management</li>
              </ul>
            </FunCard>

            <FunCard
              color="orange"
              className="w-full  md:w-[48%] lg:w-[30%] flex-none"
            >
              <h3 className="mt-auto">MBA in Project Management</h3>
              <p>
                Learn how to oversee large-scale projects and improve
                organizational efficiency.
              </p>
              <p>
                <strong>Related Specializations:</strong>
              </p>
              <ul className="list-disc list-outside pl-fluid-lg text-fluid-sm">
                <li>Logistics, Materials, and Supply Chain Management</li>
                <li>Operations Management and Supervision</li>
                <li>Executive/Career Coaching</li>
                <li>Sales, Distribution, and Marketing Operations</li>
                <li>Human Resources Management</li>
              </ul>
            </FunCard>

            <FunCard
              color="violet"
              className="w-full  md:w-[48%] lg:w-[30%] flex-none"
            >
              <h3 className="mt-auto">MBA in Marketing</h3>
              <p>Create and execute marketing strategies and campaigns.</p>
              <p>
                <strong>Related Specializations:</strong>
              </p>
              <ul className="list-disc list-outside pl-fluid-lg text-fluid-sm">
                <li>Marketing Research</li>
                <li>Advertising</li>
                <li>Graphic Design</li>
                <li>Digital Marketing</li>
                <li>Public Relations and Applied Communication</li>
                <li>Nonprofit/Public Organizational Management</li>
                <li>Management</li>
              </ul>
            </FunCard>

            <FunCard
              color="navy-blue"
              className="w-full  md:w-[48%] lg:w-[30%] flex-none"
            >
              <h3 className="mt-auto">MBA in Entrepreneurship</h3>
              <p>
                Equip yourself with the knowledge and skills to start and manage
                you own businesses and ventures.
              </p>
              <p>
                <strong>Related Specializations:</strong>
              </p>
              <ul className="list-disc list-outside pl-fluid-lg text-fluid-sm">
                <li>Franchising</li>
                <li>Small Business Management</li>
                <li>Social Entrepreneurship</li>
                <li>E-Commerce</li>
                <li>Real Estate</li>
              </ul>
            </FunCard>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col bg-[#bcc5c0]  md:petal-brand-yellow petal-left-0 petal-tr-100 petal-top-0 petal-square-h-100 lg:petal-square-w-50 overflow-hidden">
        <figure className="w-full h-[80vw] -mb-[40vw] relative top-0 right-0 md:absolute lg:w-2/3 md:h-full z-0">
          <Image
            src={ElevateYourCareer}
            alt="How an MBA Can Elevate Your Career"
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </figure>

        <div className="container-wide z-10 relative py-[7vw]">
          <FunCard
            color="yellow"
            className="bg-white w-full md:w-[48%] flex-none"
          >
            <h2>How an MBA Can Elevate Your Career</h2>
            <p>
              Whether you're aiming to move up in your current company or pivot
              to a new industry, <strong>an MBA can be a game-changer.</strong>{" "}
              Graduates of MBA programs report increased job satisfaction,
              better leadership skills, and access to a larger professional
              network. From finance to business operations, an MBA equips you
              with versatile skills that are in demand.
            </p>
          </FunCard>
        </div>
      </section>

      {/* <section className="bg-brand-lightteal bg-[url(/images/teal-texture.svg)] overflow-hidden py-fluid-5xl px-fluid-2xl">
        <div className="container-wide">
          <h2>Your Future MBA Awaits</h2>
          <p>Get personalized recommendations from top universities and colleges for MBA degree opportunities. Request detailed information about top MBA programs today!</p>
          <p>Start the process by taking our free Business Career Quiz.</p>
          <Button label="Take the Quiz and Get More Info" appearance="primary" href="https://my.appily.com/register/adult/businesscareers1/degree" className="button" />
        </div>
      </section> */}

      <section className="bg-brand-lightteal py-fluid-5xl px-fluid-2xl">
        <div className="container-wide flex flex-col gap-fluid-4xl items-start md:flex-row">
          <figure className="w-full md:w-1/2">
            <Image
              src={CommonQuestions}
              alt="Common Questions About MBA Programs"
              quality={85}
              className="object-cover"
              width={800}
              height={533}
            />
          </figure>
          <div className="w-full md:w-1/2">
            <h2>Common Questions About MBA Programs</h2>
            <div>
              <h3 className="mb-0 font-sans font-bold">
                What can I do with an MBA?
              </h3>
              <p>
                An MBA can lead to careers in a range of industries including
                finance, marketing, consulting, entrepreneurship, and executive
                management.
              </p>

              <h3 className="mb-0 font-sans font-bold">Should I get an MBA?</h3>
              <p>
                If you&apos;re looking to boost your career prospects, expand
                your professional network, and gain specialized knowledge, an
                MBA is a great choice.
              </p>

              <h3 className="mb-0 font-sans font-bold">
                Which schools offer MBA programs?
              </h3>
              <p>
                There are many great options! Request more information and we
                can connect you with top schools offering MBA degrees that will
                support your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="lets-go-section"
        className="relative bg-brand-navy-blue bg-[url(/images/darkblue-texture.svg)] text-white py-fluid-5xl px-fluid-2xl text-center before:bg-brand-navy-blue before:content-[''] before:absolute before:inset-0 before:z-1 before:opacity-80"
      >
        <div className="container-default relative z-10">
          <h2>Take the Next Step in Your Career</h2>
          <p className="text-fluid-lg">
            A Master's in Business Administration could be the catalyst for
            achieving your career goals. Get started today!
          </p>
          <Button
            label="Start the Free Business Career Quiz"
            appearance="primary"
            href="https://my.appily.com/register/adult/businesscareers1/degree"
            className="button mx-auto"
          />
        </div>
      </section>

      <StickyCta
        ctaLabel="Start the Free Business Career Quiz"
        trackedElement="#lets-go-section"
      />

      <PageFooter />
    </>
  );
}
