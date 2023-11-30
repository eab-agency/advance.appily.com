import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

interface LinkedCardsSectionProps {
  data: {
    title: string
    description?: string
    cardsList: {
      title: string
      description: string
      link: string
    }[]
  }
}

export default function LinkedCardsSection({ data }: LinkedCardsSectionProps) {
  return (
    <section className="rowOfCards">
      <div className="group contentWrapper center-aligned column">
        <h2>{data.title}</h2>
        <div className="group row columns">

          {data.cardsList.map((card, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div className="column cardContent" key={index}>
              <Link
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cardLink"
              ><h3>{card.title}</h3><FaExternalLinkAlt /></Link>
              <p>{card.description}</p>
            </div>
          ))
          }
        </div>
      </div>
    </section>
  )
}
