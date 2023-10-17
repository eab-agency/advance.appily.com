import { Accordion } from "@/components";

export function ChoosingRightSchoolBusinessDegree() {
  return (
    <section className="chooseRightSchool">
      <div className="group column">
        <div className="intro-text">
          <h2>
            Choosing the Right School for <strong>your Business Degree</strong>
          </h2>
          <p>
            Embarking on your journey to earn a business degree is an exciting step
            toward a rewarding career path. As you navigate this decision, it's
            crucial to focus on the aspects that truly matter and align with your
            aspirations. While rankings might catch your attention, remember that
            the perfect fit goes beyond numbers. Here are{" "}
            <strong>five vital factors</strong> to keep at the forefront when selecting the right school for your
            business degree:
          </p>
        </div>

        <div className="accordionGroup">
          <Accordion title="Convenience">
            <p>
              Choosing a school that's within reach not only minimizes commute
              stress but also fosters a stronger sense of community. Proximity opens
              doors to local networking events, internship opportunities, and a
              chance to immerse yourself in your city's business ecosystem.
            </p>
          </Accordion>
          <Accordion title="Flexibility">
            <p>
              Life doesn't pause while you pursue your degree. Opt for a school that
              offers flexible schedules, online learning options, and part-time
              programs. This allows you to balance your academic journey with
              personal commitments, ensuring a smoother transition into higher
              education.
            </p>
          </Accordion>
          <Accordion title="Cost">
            <p>
              Higher education is an investment, and it's essential to find a school
              that aligns with your budget. Explore scholarship opportunities,
              financial aid, and programs that provide a strong return on investment
              by offering real-world skills that resonate with employers.
            </p>
          </Accordion>
          <Accordion title="Specializations Offered">
            <p>
              Business is a vast landscape, encompassing various disciplines from
              finance to marketing, entrepreneurship to data analytics. Seek a
              school that offers specialized tracks or concentrations that resonate
              with your passion and career goals. Customization ensures you're
              equipped with the skills most relevant to your chosen path.
            </p>
          </Accordion>
          <Accordion title="Real-World Experience and Networking">
            <p>
              Theory is essential, but the application is where the magic happens.
              Look for schools that offer internships, co-op programs, or
              partnerships with local businesses. Real-world experience not only
              enhances your resume but also enables you to build a network that
              could shape your future.
            </p>
          </Accordion>
        </div>
        <div className="sectionFooter">
          <p>
            Remember, the "best" school isn't defined solely by rankings; it's the
            one that{" "}
            <strong>aligns with your needs, aspirations, and values.</strong> As you
            embark on your business degree journey, prioritize factors that resonate
            with your personal and professional growth. The right fit will propel
            you towards success, equipping you with the skills, knowledge, and
            connections needed to excel in the dynamic world of business.
          </p>
        </div>
      </div>
    </section>
  );
}
