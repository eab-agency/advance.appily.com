/* eslint-enable */
import { MdChevronRight } from 'react-icons/md';
import Carousel from 'react-multi-carousel';
/* eslint-disable */
import Image from 'next/image';

import { useUser } from '../../context/context';

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
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
  },
}

const SchoolCarousel = ({ handleClick, className }) => {
  const { matchedSchools } = useUser()
  const handleButtonClick = school => {
    handleClick(school)
  }
  // if schools is empty, return null
  if (!matchedSchools) return null

  return (
    <Carousel responsive={responsive} showDots infinite containerClass={className}>
      {matchedSchools &&
        matchedSchools.map(school => (
          <div className="item-content" key={school.title}>
            <div className="item-head">
              <Image
                src={school.imageURL}
                width="400"
                height="300"
                alt={school.title}
                className="school-thumbnail"
              />
              <Image
                src={school.logoUrl}
                width="100"
                height="100"
                alt={`${school.title} logo`}
                className="school-logo"
              />
            </div>
            <div className="item-text">
              <div className="item-head">
                <h4 key={school.title}>{school.title}</h4>
                <p>
                  {school.schoolMeta.city}, {school.schoolMeta.state}
                </p>
              </div>
              <p>{school.description}</p>
              <button type="button" onClick={() => handleButtonClick(school)}>
                <span>{school.buttonText}</span>
                <i>
                  <MdChevronRight />
                </i>
              </button>
            </div>
          </div>
        ))}
    </Carousel>
  )
}
export default SchoolCarousel
