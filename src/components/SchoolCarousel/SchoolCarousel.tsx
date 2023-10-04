/* eslint-disable */
import Image from 'next/image';
/* eslint-enable */
import { MdChevronRight } from 'react-icons/md';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import type { CarouselCard } from "../../../payload-types"
import RichText from '../RichText'

import { useUser } from '../../context/context';

// import '@/styles/components/SchoolCarousel.scss'

type SchoolCarouselProps = {
  handleClick: (card: CarouselCard) => void;
  className: string;
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1800 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1800, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
  },
}

const SchoolCarousel = ({ handleClick, className }) => {
  const { matchedSchools } = useUser()

  const handleButtonClick = (card: CarouselCard) => {
    handleClick(card)
  }
  // if schools is empty, return null
  if (!matchedSchools) return null
  return (
    <Carousel responsive={responsive} showDots infinite containerClass={className}>
      {/* biome-ignore lint/complexity/useOptionalChain: <explanation> */}
      {matchedSchools &&
        matchedSchools.map((card: CarouselCard) => (
          <>
            <div className="item-content" key={card.id}>
              <div className="item-head">
                <Image
                  src={card.image?.url}
                  width="400"
                  height="300"
                  alt={card.image.alt}
                  className="school-thumbnail"
                />
                <Image
                  src={card.partner.logo.url}
                  width="100"
                  height="100"
                  alt={card.partner.logo.alt}
                  className="school-logo"
                />
              </div>
              <div className="item-text">
                <div className="item-head">
                  <h4 key={card.partner.title}>{card.partner.title}</h4>
                  <p>
                    {card.partner.contact.city}, {card.partner.contact.state}
                  </p>
                </div>
                <RichText content={card.description} />
              </div>
              <div className="item-foot">
                <button type="button" onClick={() => handleButtonClick(card)}>
                  <span>{card.links?.[0]?.link.label}</span>
                  <i>
                    <MdChevronRight />
                  </i>
                </button>
              </div>
            </div>
          </>
        ))}
    </Carousel>)

}
export default SchoolCarousel
