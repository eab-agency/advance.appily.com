import Image from 'next/image';
import mbaHero from '../../assets/mba-hero.jpg';
import styles from './styles.module.css';



export const Hero = () => {
  	return (
      <section className={`relative w-full bg-brand-lightteal bg-[url(/images/teal-texture.svg)] ${styles.hero}`}>
        <div className="container-wide flex items-center py-[15vw] xl:py-[10vw]">
          <div className="px-fluid-lg md:w-1/2 xl:w-2/3">
              <h1 className="text-brand-navy-blue text-left">Unlock Your Career Potential with an MBA</h1>
              <p className=''>Discover How an MBA Can Transform Your Future in Business, Finance, and Leadership</p>
          </div>
          <figure className="block lg:absolute h-full aspect-square xl:aspect-[1.2/1] m-0 top-0 right-0 decorated">
            <Image
              className={styles.imgItem}
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
