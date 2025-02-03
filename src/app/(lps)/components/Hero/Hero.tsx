import Image from 'next/image';
import mbaHero from '../../assets/mba-hero.jpg';

export const Hero = () => {
  	return (
      <section className="relative w-full bg-brand-lightteal bg-[url(/images/teal-texture.svg)] overflow-hidden">
        <div className="w-full lg:container-wide flex flex-col gap-fluid-xl lg:flex-row items-center pt-0 pb-fluid-xl lg:py-[15vw] xl:py-[10vw]">
          <div className="px-fluid-lg w-[90%] py-fluid-xl lg:py-0 lg:w-1/2 xl:w-2/3 order-1 lg:order-0 z-10">
              <h1 className="text-brand-navy-blue text-left">Unlock Your Career Potential with an MBA</h1>
              <p className=''>Discover How an MBA Can Transform Your Future in Business, Finance, and Leadership</p>
          </div>
          <figure className="block order-0 lg:order-1 relative lg:absolute w-full h-90 lg:w-auto lg:h-full lg:aspect-square xl:aspect-[1.2/1] m-0 top-0 right-0 petal-brand-yellow petal-left-0 petal-tl-100">
            <Image
              className="object-cover rounded-bl-full overflow-hidden z-10"
              alt=""
              src={mbaHero}
              fill
              sizes='(max-width: 640px) 100vw, 80vw'
              unoptimized
              />
          </figure>
        </div>
      </section>
    );
};
