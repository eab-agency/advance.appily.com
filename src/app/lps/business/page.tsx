/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components";
import Image from "next/image";
import { Accordion } from "../components/Accordion";
import { FactsCard } from "../components/FactsCard";
import { FunCard } from "../components/FunCard";
import { Hero } from "../components/Hero";
import { PageFooter } from "../components/PageFooter";
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
  title: "Master’s Degrees in Business",
  description:
    "Find the right advanced business degree for your goals. Take our quiz to explore careers in finance, management, and leadership. Unlock your potential today!",
  openGraph: {
    title: "Master’s Degrees in Business",
    description:
      "Find the right advanced business degree for your goals. Take our quiz to explore careers in finance, management, and leadership. Unlock your potential today!",
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
    title: "Master’s Degrees in Business",
    description:
      "Find the right advanced business degree for your goals. Take our quiz to explore careers in finance, management, and leadership. Unlock your potential today!",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/images/mba-hero.jpg`],
  },
};

export default function Page() {
  return (
    <>
      <PageHead />
      <Hero
        title="Find Your Best-Fit Business Degree and Unlock New Career Opportunities"
        image={heroImage}
        altText="A group of business professionals discussing a project"
      />

      <section className="container-wide px-fluid-lg py-fluid-5xl flex flex-col md:flex-row gap-fluid-4xl items-start relative">
        <div className="md:w-3/5">
          <h2>
            Explore Business Marketing, Management, and Leadership Degrees
            Designed to Elevate Your Career
          </h2>
          <p>
            Are you wondering "What can I do with a business degree?" or "What
            can I do with a master&apos;s in business?"{" "}
            <strong>Our free quiz will help you</strong> discover the right
            degree path and career opportunities tailored to your interests and
            goals. The Bureau of Labor Statistics predicts that nearly one
            million jobs in business will be created each year over the next
            decade. Many colleges and universities offer flexible, affordable
            degrees or certificates that can give you a head start in
            transferring your skills to a new or more advanced role.
          </p>
        </div>
        <FunCard className="shadow-md-orange" color="teal">
          <h3>Take Our Free Business Career Quiz</h3>
          <p>
            In less than three minutes, discover which business careers match
            your skills and interests, along with next steps to explore.
          </p>
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
          <h2 className="block text-center">
            Why Pursue an Advanced Business Degree?
          </h2>
          <p className="text-center mb-fluid-3xl container-default">
            Business degrees open doors to roles in marketing, finance,
            management, and entrepreneurship. These programs provide the skills
            and credentials needed to excel in high-demand fields. Additionally,
            different types of business degrees and salaries offer exciting
            opportunities for career growth and financial success.
          </p>
          <div className="flex flex-col md:flex-row gap-fluid-4xl items-start">
            <FactsCard
              headingLevel="h3"
              color="yellow"
              title="Versatile Career Paths"
              description="Business degrees open doors to roles in marketing, finance, management, and entrepreneurship."
            />
            <FactsCard
              headingLevel="h3"
              color="violet"
              title="High Earning Potential"
              description="Different types of business degrees and salaries vary, but graduates often see significant financial growth over time."
            />
            <FactsCard
              headingLevel="h3"
              color="teal"
              title="Leadership Opportunities"
              description="Master's degrees in business help you develop advanced skills for executive and managerial positions."
            />
          </div>
        </div>
      </section>

      <section className="py-fluid-5xl px-fluid-2xl">
        <div className="container-wide">
          <h2 className="block text-center">
            Explore Potential Business Career Paths
          </h2>
          <p className="text-center container-default mb-fluid-3xl">
            You can pursue a wide range of specializations, from business
            marketing degrees to master&apos;s degrees in business, catering to
            diverse career aspirations. Whether you&apos;re looking to switch
            careers or are seeking to advance your skills in your existing role,
            understanding the different types of business degrees and salaries
            can help guide your decision. Take our Business Career Quiz to
            explore programs that match your interests and career goals to
            maximize your potential earnings.
          </p>

          <div className="container-default flex flex-col gap-fluid-xl">
            <Accordion title="Business Administration" titleLevel="h3">
              <p>
                If you&apos;re a dynamic and strategic thinker with a passion
                for guiding teams toward success, you&apos;re well-suited for
                roles in leadership and management. You possess a natural
                aptitude for planning, decision-making, and motivating others,
                thriving in fast-paced corporate environments. Equipped with the
                skills to handle the responsibilities of management, you&apos;re
                ready to lead and inspire. Whether you have a background in
                business or aspire to excel in the world of commerce, the
                executive and leadership path offers a promising future.
              </p>
              <p>
                <strong>Related Career Paths Include:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>Executive Business Administration</li>
                <li>Business Administration</li>
                <li>Organizational Leadership</li>
                <li>International Business/Trade/Commerce</li>
                <li>Risk Management</li>
                <li>Office Management and Supervision</li>
                <li>Nonprofit/Public Organizational Management</li>
                <li>Management</li>
              </ul>
            </Accordion>

            <Accordion title="Marketing Careers" titleLevel="h3">
              <p>
                Do you have a flair for creativity and innovation? You may
                thrive in the world of marketing. You excel at crafting
                compelling campaigns, building strong brands, and effectively
                engaging with audiences. Working in dynamic and innovative
                environments keeps you motivated, and you constantly seek new
                ways to connect with clients and customers. With a talent for
                creative thinking and a passion for driving business growth,
                you&apos;re well-suited for careers in marketing and the
                creative fields.
              </p>
              <p>
                <strong>Related Career Paths Include:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>Marketing</li>
                <li>Marketing Research</li>
                <li>Advertising</li>
                <li>Graphic Design</li>
                <li>Digital Marketing</li>
                <li>Public Relations and Applied Communication</li>
                <li>Nonprofit/Public Organizational Management</li>
                <li>Management</li>
              </ul>
            </Accordion>

            <Accordion title="Finance Careers" titleLevel="h3">
              <p>
                For those who excel in working with numbers, financial
                management offers an ideal path. You thrive in analyzing data,
                managing finances, and making well-informed decisions to drive
                profitability. Whether in financial institutions or investment
                firms, you feel comfortable navigating financial data and
                tracking economic trends. With a strong analytical mindset and a
                desire to influence financial outcomes, careers in finance,
                accounting, and economics present exciting opportunities.
              </p>
              <p>
                <strong>Related Career Paths Include:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>Finance</li>
                <li>Accounting</li>
                <li>Business Economics</li>
                <li>Banking and Financial Support Services</li>
                <li>Investments and Securities</li>
                <li>Taxation</li>
              </ul>
            </Accordion>

            <Accordion
              title="Information Technology and Analytics Careers"
              titleLevel="h3"
            >
              <p>
                For individuals with a strong affinity for technology, working
                with computers and data feels natural. You&apos;re driven by a
                passion for leveraging technology to solve problems and conduct
                data analysis. Enthusiastic about optimizing processes and
                developing innovative solutions to complex challenges, you
                thrive in environments that require technological expertise.
                With a keen interest in data-driven decision-making and a solid
                technological aptitude, you&apos;re well-suited for careers in
                information technology and analytics.
              </p>
              <p>
                <strong>Related Career Paths Include:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>Management of Information Systems</li>
                <li>Information Technology</li>
                <li>Business Analytics</li>
                <li>Business Statistics</li>
                <li>System Administrator</li>
                <li>Financial Analytics</li>
              </ul>
            </Accordion>

            <Accordion title="Entrepreneurial Careers" titleLevel="h3">
              <p>
                If you&apos;re entrepreneurial-minded, you possess a natural
                drive to take risks and create new ventures. Your
                entrepreneurial spirit motivates you to seize opportunities and
                build businesses from the ground up. The prospect of being your
                own boss and driving business growth inspires your ambition. If
                it sounds like a dream to launch your own business or lead
                innovative projects, the path of entrepreneurship offers an
                exciting and rewarding journey.
              </p>
              <p>
                <strong>Related Career Paths Include:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>Entrepreneurship</li>
                <li>Franchising</li>
                <li>Small Business Management</li>
                <li>Social Entrepreneurship</li>
                <li>E-Commerce</li>
                <li>Real Estate</li>
              </ul>
            </Accordion>

            <Accordion
              title="Management and Operations Careers"
              titleLevel="h3"
            >
              <p>
                You may prioritize people and excel at creating positive work
                environments that nurture talent and foster growth. If so,
                you&apos;re well-suited for roles in operations, project
                management, and human resources. You thrive in collaborative
                settings, bringing out the best in both colleagues and clients.
                You find fulfillment in managing teams, handling employee
                relations, and facilitating effective teamwork. With qualities
                like empathy, strong communication skills, and a drive to build
                cohesive teams, you&apos;re positioned to succeed in these
                dynamic fields.
              </p>
              <p>
                <strong>Related Career Paths Include:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>Logistics, Materials, and Supply Chain Management</li>
                <li>Operations Management and Supervision</li>
                <li>Project Management</li>
                <li>Executive/Career Coaching</li>
                <li>Sales, Distribution, and Marketing Operations</li>
                <li>Human Resources Management</li>
              </ul>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col bg-[#bcc5c0]  md:petal-brand-yellow petal-left-0 petal-tr-100 petal-top-0 petal-square-h-100 lg:petal-square-w-50 overflow-hidden">
        <figure className="w-full h-[80vw] -mb-[40vw] relative top-0 right-0 md:absolute lg:w-2/3 md:h-full z-0">
          <Image
            src={ElevateYourCareer}
            alt="How a Business Degree Can Elevate Your Career"
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
            <h2>How a Business Degree Can Elevate Your Career</h2>
            <p>
              <strong>Broad Skill Set:</strong> Business degrees teach a
              combination of analytical, leadership, and communication skills.
            </p>
            <p>
              <strong>Job Market Demand:</strong> Business graduates are sought
              after in nearly every industry, from tech to finance.
            </p>
            <p>
              <strong>Career Flexibility:</strong> With a business degree, you
              can pivot into different fields as your interests evolve.
            </p>
          </FunCard>
        </div>
      </section>

      {/* <section className="bg-brand-lightteal bg-[url(/images/teal-texture.svg)] overflow-hidden py-fluid-5xl px-fluid-2xl">
        <div className="container-wide">
          <h2>Ready to Find the Right Business Program?</h2>
          <p>Get personalized recommendations for top business master&apos;s degrees and degrees in business programs and start planning your future. Start the process by taking our Business Career Quiz today!</p>
          <Button label="Take the Quiz and Get More Info" appearance="primary" href="https://my.appily.com/register/adult/businesscareers1/degree" className="button" />
        </div>
      </section> */}

      <section className="bg-brand-lightteal py-fluid-5xl px-fluid-2xl">
        <div className="container-wide flex flex-col gap-fluid-4xl items-start md:flex-row">
          <figure className="w-full md:w-1/2">
            <Image
              src={CommonQuestions}
              alt="Common Questions About Business Degrees"
              quality={85}
              className="object-cover"
              width={800}
              height={533}
            />
          </figure>
          <div className="w-full md:w-1/2">
            <h2>Common Questions About Business Degrees</h2>
            <div>
              <h3 className="mb-0 font-sans font-bold">
                What can I do with a business degree?
              </h3>
              <p>
                There are many things to do with a business degree, including
                roles in management, marketing, finance, and business
                operations. Business degrees provide the flexibility to pursue a
                wide range of careers, helping graduates explore different
                fields based on their interests.
              </p>

              <h3 className="mb-0 font-sans font-bold">
                What can I do with a master&apos;s in business?
              </h3>
              <p>
                A master&apos;s degree in business allows graduates to
                specialize in areas such as strategic management, finance, and
                analytics, often leading to executive or senior-level roles.
              </p>

              <h3 className="mb-0 font-sans font-bold">
                What are the different types of business degrees and their
                salaries?
              </h3>
              <p>
                Types of business degrees include business marketing, business
                management, and financial analysis. Salaries can range from
                $80,000 to $150,000 annually, depending on the role and
                experience.
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
          <h2>Take the Next Step Toward Your Ideal Career</h2>
          <p className="text-fluid-lg">
            A business degree can be the catalyst for achieving your
            professional ambitions. Take our quiz today and find out which
            program is the right fit for your goals.
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
