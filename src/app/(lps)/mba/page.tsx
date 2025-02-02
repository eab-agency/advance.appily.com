import { HiBadgeCheck } from "react-icons/hi";
import { FactsCard } from "../components/FactsCard";
import { FunCard } from "../components/FunCard";
import { Hero } from "../components/Hero";
import { PageFooter } from "../components/PageFooter/PageFooter";
import { PageHead } from "../components/PageHead/PageHead";

export default function DashboardPage() {
  return (
    <>
      <PageHead />
      <Hero />

      <section className="container-wide px-fluid-lg py-fluid-5xl flex flex-col md:flex-row gap-fluid-4xl items-start relative">
        <div className="md:w-3/5 deco-l-brand-violet deco-r-left-0">
          <h2>Are you ready to take the next step in your professional journey?</h2>
          <p>Earning a Masters in Business Administration can provide the skills, knowledge, and network you need to unlock new career opportunities.  If you&apos;re wondering "Should I get an MBA?" or "What can I do with an MBA?", our interactive quiz can help guide you in the right direction.</p>

          <h3>Why Pursue an MBA?</h3>
          <ul className="flex flex-col gap-fluid-lg">
            <li className="flex gap-fluid-sm">
              <HiBadgeCheck className="text-brand-teal text-3xl shrink-0" />
              <div>
                <strong>Broaden Your Career Horizons:</strong> MBA degrees can lead to roles in senior management, consulting, or entrepreneurship.
              </div>
            </li>
            <li className="flex gap-fluid-sm">
              <HiBadgeCheck className="text-brand-teal text-3xl shrink-0" /><div><strong>Specialize in High-Demand Fields:</strong> MBA degree programs are designed to support careers in a range of industries such as finance, marketing, project management/operations, information technology, analytics, and organizational leadership, just to name a few!</div></li>
              <li className="flex gap-fluid-sm">
              <HiBadgeCheck className="text-brand-teal text-3xl shrink-0" /><div><strong>Gain a Competitive Edge:</strong> MBA graduates often enjoy higher salaries and better job prospects.</div></li>
          </ul>
        </div>
        <FunCard className="shadow-md-orange" color="teal">
          <h3>Let us help you find the best MBA business program!<br/><br/>Take our Free Career Quiz </h3>
          <p>Answer a few questions to get matched with the best MBA programs for you.</p>
          <button className="btn btn-primary">Get Started</button>
        </FunCard>

      </section>

      <section className="bg-brand-navy-blue text-white py-fluid-5xl px-fluid-2xl facts">
        <div className="container-wide">
          <h2 className="block text-center">Is earning an MBA worth it?</h2>
          <div className="flex flex-col md:flex-row gap-fluid-4xl items-start">
            <FactsCard
              headingLevel="h3"
              color="yellow"
              title="Employment Rate"
              description="USC Marshall reports that approximately 97% of their full-time MBA graduates secured employment within three months post-graduation with an average base salary exceeding $150k."
              source="Marshall School of Business"
            />
            <FactsCard
              headingLevel="h3"
              color="violet"
              title="Salary-to-Debt Ratio"
              description="Many MBA programs across the US have a high ROI. At some schools, graduates earn salaries that exceed 216% of their student debt, which indicates a substantial return on investment."
              source="US News"
            />
            <FactsCard
              headingLevel="h3"
              color="teal"
              title="Startup Initiatives"
              description="There's a notable trend of MBA graduates, especially older alumni, leveraging their degrees to launch startups, with over 40% of graduates aged 54 and above starting their own companies."
              source="Financial Times"
            />

          </div>
        </div>
      </section>

      <section className="py-fluid-5xl px-fluid-2xl">
          <div className="container-wide">
              <h2 className="block text-center">Explore MBA Program Specializations</h2>

              <div className="flex flex-wrap justify-center gap-fluid-2xl items-start">
                  <FunCard color="teal" className="w-full sm:w-[48%] lg:w-[30%] flex-none">
                      <h3 className="mt-auto">MBA in Finance</h3>
                      <p>Advance your financial acumen and pursue roles in investment, corporate finance, or financial consulting.</p>
                      <p><strong>Related specializations:</strong></p>
                      <ul className="list-disc list-outside pl-fluid-lg text-fluid-sm">
                        <li>Accounting</li>
                        <li>Business Economics</li>
                        <li>Banking and Financial Support Services</li>
                        <li>Investments and Securities</li>
                        <li>Taxation</li>
                      </ul>
                  </FunCard>

                  <FunCard color="yellow" className="w-full  sm:w-[48%] lg:w-[30%] flex-none">
                      <h3 className="mt-auto">MBA in Management or MBA in Organizational Leadership</h3>
                      <p>Gain the skills to lead teams and manage complex initiatives across industries. Prepare for executive roles and become a leader who inspires change.</p>
                      <p><strong>Related specializations:</strong></p>
                        <ul className="list-disc list-outside pl-fluid-lg text-fluid-sm">
                          <li>Executive Business Administration</li>
                          <li>Business Administration</li>
                          <li>International Business/Trade/Commerce</li>
                          <li>Risk Management</li>
                          <li>Office Management and Supervision</li>
                          <li>Nonprofit/Public Organizational Management</li>
                        </ul>
                  </FunCard>

                  <FunCard color="orange" className="w-full  sm:w-[48%] lg:w-[30%] flex-none">
                      <h3 className="mt-auto">MBA in Project Management</h3>
                      <p>Learn how to oversee large-scale projects and improve organizational efficiency.</p>
                      <p><strong>Related specializations:</strong></p>
                        <ul className="list-disc list-outside pl-fluid-lg text-fluid-sm">
                          <li>Logistics, Materials, and Supply Chain Management</li>
                          <li>Operations Management and Supervision</li>
                          <li>Executive/Career Coaching</li>
                          <li>Sales, Distribution, and Marketing Operations</li>
                          <li>Human Resources Management</li>
                        </ul>
                  </FunCard>

                  <FunCard color="violet" className="w-full  sm:w-[48%] lg:w-[30%] flex-none">
                      <h3 className="mt-auto">MBA in Marketing</h3>
                      <p>Create and execute marketing strategies and campaigns.</p>
                      <p><strong>Related specializations:</strong></p>
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

                  <FunCard color="navy-blue" className="w-full  sm:w-[48%] lg:w-[30%] flex-none">
                      <h3 className="mt-auto">MBA in Entrepreneurship</h3>
                      <p>Equip yourself with the knowledge and skills to start and manage you own businesses and ventures.</p>
                      <p><strong>Related specializations:</strong></p>
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

      <section className="bg-brand-lightgray py-fluid-5xl px-fluid-2xl">
        <figure className="absolute top-0 right-0 w-1/2 h-full">
          {/* <Image /> */}
        </figure>

        <div className="container-wide">
          <FunCard color="yellow" className="w-full md:w-[48%] flex-none">
            <h2>How an MBA Can Elevate Your Career</h2>
            <p>Whether you're aiming to move up in your current company or pivot to a new industry, <strong>an MBA can be a game-changer.</strong> Graduates of MBA programs report increased job satisfaction, better leadership skills, and access to a larger professional network. From finance to business operations, an MBA equips you with versatile skills that are in demand.</p>
          </FunCard>
        </div>

      </section>

      <section className="bg-brand-lightteal py-fluid-5xl px-fluid-2xl">
        <div className="container-wide">
          <h2>Your Future MBA Awaits</h2>
          <p>Get personalized recommendations from top universities and colleges for MBA degree opportunities. Request detailed information about top MBA programs today!</p>
          <p className="text-fluid-2xl">Start the process by taking our free Business Career Quiz.</p>
          <button className="btn btn-primary">Take the Quiz and Get More Info</button>
        </div>
      </section>

      <section className="bg-brand-lightteal py-fluid-5xl px-fluid-2xl">
        <div className="container-wide">
          <figure>
            {/* <Image /> */}
          </figure>
          <h2>Common Questions About MBA Programs</h2>
          <div>
            <h3>What can I do with an MBA?</h3>
            <p>An MBA can lead to careers in a range of industries including  finance, marketing, consulting, entrepreneurship, and executive management.</p>

            <h3>Should I get an MBA?</h3>
            <p>If you&apos;re looking to boost your career prospects, expand your professional network, and gain specialized knowledge, an MBA is a great choice.</p>

            <h3>Which schools offer MBA programs?</h3>
            <p>There are many great options! Request more information and we can connect you with top schools offering MBA degrees that will support your goals.</p>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy-blue text-white py-fluid-5xl px-fluid-2xl text-center">
        <div className="container-default">
          <h2>Take the Next Step in Your Career</h2>
          <p className="text-fluid-lg">A Masters in Business Administration could be the catalyst for achieving your career goals. Get started today!</p>
          <button className="btn btn-primary">Start the Free Business Career Quiz </button>
        </div>
      </section>

     <PageFooter />
    </>
  );
}
