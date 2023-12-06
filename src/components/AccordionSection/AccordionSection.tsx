import { Accordion, Button } from '@/components'
import Image from 'next/image'

interface AccordionSectionProps {
  id?: string
  data: {
    title: string
    description: string
    buttonText?: string
    buttonLink?: string
    accordionList: {
      title: string
      description: string
    }[]
    image: {
      path: string
      altText: string
    }
  }
}

export default function AccordionSection({ data, id }: AccordionSectionProps) {
  return (
    <section id={id} className="whyChoose">
      <div className="group center-aligned cols-2">
        <div className="column">
          <div className="intro">
            <h2
              dangerouslySetInnerHTML={{
                __html: data.title,
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
            {data.buttonText && <Button
              appearance="primary"
              className="button btn-primary"
              href={data.buttonLink}
              label={data.buttonText}
            />}
          </div>
          <div className="accordion-group">
            {data.accordionList.map((reason, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Accordion key={index} title={reason.title}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: reason.description,
                  }}
                />
              </Accordion>
            ))}
          </div>
        </div>
        <div className="column">
          <figure className="highlighted-img">
            <Image
              src={data.image.path}
              width={480}
              height={480}
              alt={data.image.altText}
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
