import Image from "next/image"

interface BuildPlanHeroProps {
  data: {
    title: string
    description: string
    image: {
      path: string
      altText: string
    }
  }
}

export default function BuildPlanHero({ data }: BuildPlanHeroProps) {
  return (
    <section className="resultsHero">
      <div className="group">
        <div className="heroContent column">
          <div className="intro-title">
            <span>Your Back-to-School Plan</span>
          </div>
          <h1>{data.title}</h1>
          {data.description &&
            <div
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          }
        </div>
        <figure className="column">
          {/* <Lottie animationData={computerWhiz} loop={true} /> */}
          <Image
            src={data.image.path}
            alt={data.image.altText}
            width={400}
            height={400}
            priority={true}
          />
        </figure>
      </div>
    </section>
  )
}
