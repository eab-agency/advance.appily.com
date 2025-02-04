import { Button } from "@/components";
import Image from "next/image";
import { Accordion } from "../components/Accordion";
import { FactsCard } from "../components/FactsCard";
import { FunCard } from "../components/FunCard";
import { Hero } from "../components/Hero";
import { PageFooter } from "../components/PageFooter/PageFooter";
import { PageHead } from "../components/PageHead/PageHead";

import CommonQuestions from "../assets/common-questions.png";
import heroImage from '../assets/healthcare-hero.jpg';
import ElevateYourCareer from "../assets/healthcare-professional.jpg";

export default function Page() {
  return (
    <>
      <PageHead />
      <Hero
        title="Boost Your Health Care Career With the Right Advanced Degree"
        image={heroImage}
      />

      <section className="container-wide px-fluid-lg py-fluid-5xl flex flex-col md:flex-row gap-fluid-4xl items-start relative">
        <div className="md:w-3/5">
          <h2>Chart Your Path in Health Care: Explore Careers and Graduate Degrees</h2>
          <p>Are you exploring careers in health care or wondering "Which health care career is right for me?" Our free quiz will guide you to the right degree and career pathway.</p>
          <p>With growing demand in the industry, there are numerous jobs in health care that offer long-term career stability and growth. The Bureau of Labor Statistics predicts about two million jobs in health care will be created each year over the next decade.</p>
          <p>Whether you're interested in patient care, administration, or technology, there's a rewarding career path waiting for you. </p>
        </div>
        <FunCard className="shadow-md-orange" color="teal">
          <h3>Take Our Free Health Care Careers Quiz</h3>
          <p>Not sure which pathway or graduate degree is right for you? Our quiz can help identify the best option based on your skills and interests. </p>
          <Button label="Start the Quiz Now" appearance="primary" href="https://my.appily.com/register/adult/healthcarecareers1/degree" className="button" />
        </FunCard>

      </section>

      <section className="bg-brand-navy-blue text-white py-fluid-5xl px-fluid-2xl facts">
        <div className="container-wide">
          <h2 className="block text-center">Why Pursue an Advanced Health Care Degree?</h2>
          <div className="flex flex-col md:flex-row gap-fluid-4xl items-start">
            <FactsCard
              headingLevel="h3"
              color="yellow"
              title="Broaden Your Career Opportunities"
              description="A graduate degree opens doors to advanced careers in health care, including leadership, specialized clinical roles, and research."
            />
            <FactsCard
              headingLevel="h3"
              color="violet"
              title="High Job Demand"
              description="The health care industry is projected to grow rapidly, offering countless jobs in health care across various sectors."

            />
            <FactsCard
              headingLevel="h3"
              color="teal"
              title="Specialized Skills Development"
              description="Graduate programs help you gain advanced knowledge and skills, preparing you for high-impact roles in the health care system."

            />

          </div>
        </div>
      </section>

      <section className="py-fluid-5xl px-fluid-2xl">
          <div className="container-wide">
              <h2 className="block text-center">Explore Potential Health Career Pathways</h2>
              <p className="text-center container-default mb-fluid-3xl">Fortunately, there are many career pathways if you want to work in health care—each with its own opportunities for advancement and specialization. Whether focusing on clinical roles, health education, administration, or scientific research, professionals in health care contribute to improving the well-being of individuals and communities. By exploring different pathways, you can identify careers that align with your personal skills and interests, ultimately leading to fulfilling and impactful roles in this growing industry.</p>

              <div className="container-default flex flex-col gap-fluid-xl">

                <Accordion title="Executive and Administrative Roles" titleLevel="h3">
                  <p>If you&apos;re organized, driven, and have an interest in the business side of health care, you may excel in planning, directing, and coordinating medical and health services. The dynamic nature of health care, with its constantly evolving laws, regulations, and technological advancements, presents challenges you&apos;d be well-equipped to handle. Whether you come from a background in business or health care, you&apos;ll be ready to take on the responsibilities of management.</p>
                  <p><strong>Potential Career Paths:</strong></p>
                  <ul>
                    <li><strong>Administrative services and facilities managers:</strong> Plan, direct, and coordinate activities that help a health care facility run efficiently.</li>
                    <li><strong>Executives or administrators:</strong> Plan strategies and policies to help organizations such as hospital systems reach their goals.</li>
                    <li><strong>Human resources manager:</strong> Plan, coordinate, and direct the employee-focused functions of organizations such as hospitals or clinics.</li>
                    <li><strong>Purchasing managers or agents:</strong> Buy products and services such as medical supplies and equipment for hospitals or clinics.</li>
                  </ul>
                </Accordion>

                <Accordion title="Clinical Practitioner Roles" titleLevel="h3">
                  <p>Empathetic individuals who are drawn to helping others often find fulfillment in health care roles. With an interest in subjects like anatomy and biology, you&apos;re comfortable working with the human body and its functions. Whether through nursing, surgery, therapy, or routine care, your primary focus is to improve the health and well-being of others. You may have prior experience in patient care and seek to advance your career, or you&apos;re exploring a new path inspired by a desire to make a difference.</p>
                  <p><strong>Potential Career Paths:</strong></p>
                  <ul>
                  <li><strong>Nursing:</strong> Nurses are essential in any health care setting and have many career advancement opportunities. Most nurses start as an LVN/LPN and move into an RN role. After that, an ARPN role allows nurses to specialize in areas such as nurse anesthetist, midwife, nurse practitioner, or other advanced careers.</li>
                  <li><strong>Dentistry:</strong> Dental hygienists often require only an associate&apos;s degree to enter the field and have a natural path to becoming dentists.</li>
                  <li><strong>Pharmacy:</strong> While a pharmacy degree is required to become a licensed pharmacist, pharmacy technicians help dispense medication and are on a natural path to their advanced degree.</li>
                  <li><strong>Therapy:</strong> There are a range of careers such as respiratory and occupational therapy that don&apos;t require a doctoral degree. These can be a good entry point into the medical field.</li>
                  <li><strong>Medicine:</strong> While common professional degrees in medicine include the MD and DO, some careers require less schooling that still involve patient care, such as a physician&apos;s assistant.</li>
                  <li><strong>Nutrition and Athletic Training:</strong> Preventive wellness is an important part of health care, and these careers often only require a bachelor&apos;s or master&apos;s degree.</li>
                  </ul>
                </Accordion>

                <Accordion title="Health Care Education Roles" titleLevel="h3">
                  <p>Lifelong learners with a passion for sharing knowledge often thrive in roles that involve educating others about health care. You may possess specialized expertise in a specific health field and be eager to guide future medical professionals, or you may have an interest in promoting public health education to broader communities. With backgrounds in patient care or education, you&apos;re driven to use your skills to make a meaningful, lasting impact.</p>
                  <p><strong>Potential Career Paths:</strong></p>
                  <ul>
                  <li><strong>Health care facilities:</strong> Work one-on-one with patients or their families to understand their diagnoses and treatment options. Organize education programs for the community about health-related topics.</li>
                  <li><strong>Executives or administrators:</strong> Plan strategies and policies to help organizations such as hospital systems reach their goals.</li>
                  <li><strong>Human resources manager:</strong> Plan, coordinate, and direct the employee-focused functions of organizations such as hospitals or clinics.</li>
                  <li><strong>Purchasing managers or agents:</strong> Buy products and services such as medical supplies and equipment for hospitals or clinics.</li>
                  <li><strong>Community health workers:</strong> These individuals a more local focus, deeply understanding the communities they serve. They identify health-related issues, collect data, and discuss health concerns with the community. They work with health education specialists and social services to inform programs that address the health and wellness needs of their community.</li>
                  <li><strong>Medical educators:</strong> These individuals often work in either universities or hospitals to support medical students or trainee doctors, or they work in a public health role in a local authority. Most university-based medical educators have transferred from a clinical career or continue to balance a clinical career with a research and teaching career as clinical academics.</li>
                  </ul>
                </Accordion>

                <Accordion title="Medical Science Roles" titleLevel="h3">
                  <p>Do you want to make groundbreaking discoveries? Are you intensely curious with a strong desire to understand how things work? Then scientific and research-oriented roles may be right for you. You may find satisfaction in analyzing lab results to assist physicians in improving patient outcomes or be motivated by the pursuit of curing diseases and developing life-changing treatments. With a background in science, you may also possess strong communication skills, including the ability to convey complex information effectively through writing.</p>
                  <p><strong>Potential Career Paths:</strong></p>
                  <ul>
                  <li><strong>Medical laboratory scientists:</strong> Perform complex tests on patient samples to find data that plays an important role in identifying and treating cancer, heart disease, diabetes, and other medical conditions.</li>
                  <li><strong>Clinical pharmacologists:</strong> Research new drug therapies for health problems such as seizure disorders and Alzheimer&apos;s disease.</li>
                  <li><strong>Medical pathologists:</strong> Research the human body and tissues, such as how cancer progresses or how certain issues relate to genetics.</li>
                  <li><strong>Toxicologists:</strong> Study the negative impacts of chemicals and pollutants on human health.</li>
                  </ul>
                </Accordion>

                <Accordion title="Health Care Technology and Analytical Roles" titleLevel="h3">
                  <p>If you&apos;re someone who excels at connecting the dots and thinking in systems, you often thrive in roles that involve analyzing data and identifying patterns. Comfortable working with technology and complex spreadsheets, you bring a methodical approach to problem-solving. With a background in analytics or information systems, you may be interested in applying your expertise to health care, or you may currently hold administrative roles and seek to enhance your skills for greater impact in the field.</p>
                  <p><strong>Potential Career Paths:</strong></p>
                  <ul>
                  <li><strong>Health information technologists:</strong> These individuals apply their knowledge of information technology and health care in a variety of ways. Some specialize in the electronic health records systems used for storing and retrieving patient data, while others analyze health care data for research or evaluation of products and services.</li>
                  <li><strong>Medical registrars:</strong> Create and maintain databases of information, such as those used to track a particular disease or condition. Medical registrars may collect and analyze information for facility, regional, and national databases; review patients' records and pathology reports to verify completeness and accuracy; assign classification codes to represent the diagnosis and treatment; and then track treatment, survival, and recovery.</li>
                  <li><strong>Bioinformatics specialists:</strong> Combine knowledge of computer programming, big data, and biology for careers that range from pharmaceutical and biotechnology development to biological and environmental analysis.</li>
                  </ul>
                </Accordion>
              </div>
          </div>
      </section>

      <section className="relative flex flex-col bg-[#bcc5c0]  md:petal-brand-yellow petal-left-0 petal-tr-100 petal-top-0 petal-square-h-100 lg:petal-square-w-50 overflow-hidden">

        <figure
        className="w-full h-[80vw] -mb-[40vw] relative top-0 right-0 md:absolute lg:w-2/3 md:h-full z-0"
        >
          <Image
            src={ElevateYourCareer}
            alt="Benefits of a Graduate Degree in Health Care"
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            />
        </figure>

        <div className="container-wide z-10 relative py-[7vw]">
          <FunCard color="yellow" className="bg-white w-full md:w-[48%] flex-none">
            <h2>How a Business Degree Can Elevate Your Career</h2>
            <p><strong>Specialized Expertise:</strong> Graduate programs provide the advanced knowledge needed to excel in specialized health care roles.</p>
            <p><strong>Leadership Opportunities:</strong> Many senior-level health care careers require a graduate degree.</p>
            <p><strong>Increased Earning Potential:</strong> Higher-level roles in health care often come with significantly higher salaries.</p>
          </FunCard>
        </div>

      </section>

      <section className="bg-brand-lightteal bg-[url(/images/teal-texture.svg)] overflow-hidden py-fluid-5xl px-fluid-2xl">
        <div className="container-wide">
          <h2>Ready to Take the Next Step in Your Health Science Career?</h2>
          <p>Get personalized recommendations for top health care programs and information about degrees that will advance your career.</p>
          <p>Start the process by taking our Health Care Career Quiz today!</p>
          <Button label="Take the Quiz and Get More Info" appearance="primary" href="https://my.appily.com/register/adult/healthcarecareers1/degree" className="button" />
        </div>
      </section>

      <section className="bg-brand-lightteal py-fluid-5xl px-fluid-2xl">
        <div className="container-wide flex flex-col gap-fluid-4xl items-start md:flex-row">
          <figure className="w-full md:w-1/2">
            <Image
              src={CommonQuestions}
              alt="Common Questions About Health Care Careers"
              quality={85}
              className="object-cover"
              width={800}
              height={533}
            />
          </figure>
          <div className="w-full md:w-1/2">
            <h2>Common Questions About Health Care Careers</h2>
            <div>
              <h3 className="mb-0 font-sans font-bold">What are the different types of health care career pathways?</h3>
              <p>Health care career pathways include clinical roles, health science careers, and administrative positions. Depending on your interests, you can pursue roles in direct patient care, research, or health care management.</p>

              <h3 className="mb-0 font-sans font-bold">How can I determine which health care career is right for me?</h3>
              <p>Our free health care career quiz can help you identify the best career path based on your skills, interests, and long-term goals.</p>

              <h3 className="mb-0 font-sans font-bold">Are there high-paying jobs in health care?</h3>
              <p>Yes, many jobs in health care, especially those requiring a graduate degree, offer high earning potential. Roles such as nurse practitioners, health care administrators, and health scientists are among the top-paying careers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-brand-navy-blue bg-[url(/images/darkblue-texture.svg)] text-white py-fluid-5xl px-fluid-2xl text-center before:bg-brand-navy-blue before:content-[''] before:absolute before:inset-0 before:z-1 before:opacity-80">
        <div className="container-default relative z-10">
          <h2>Take the Next Step Toward Your Health Care Career</h2>
          <p className="text-fluid-lg">A graduate degree in health care can be the key to advancing your career and achieving your professional goals. Take our quiz today to discover the best path and program for you.</p>
          <Button label="Start the Free Health Care Career Quiz " appearance="primary" href="https://my.appily.com/register/adult/healthcarecareers1/degree" className="button mx-auto" />
        </div>
      </section>

      <PageFooter />

    </>
  );
}
