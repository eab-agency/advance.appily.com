import Image from 'next/image';
import mbaHero from '../../assets/mba-hero.jpg';
import styles from './index.module.css';



export const Hero = () => {
  	return (
      <section className={styles.lightTealTexture}>
          <div className={styles.wrapper}>
              <h1 className={styles.unlockYourCareer}>Unlock Your Career Potential with an MBA</h1>
              <p>Discover How an MBA Can Transform Your Future in Business, Finance, and Leadership</p>
          </div>
          <figure className={styles.heroImage}>
            <Image
              className={styles.imgItem}
              // width={640}
              // height={640}
              alt=""
              src={mbaHero}
              fill
              sizes='(max-width: 640px) 100vw, 80vw'
              quality={85}
            />
          </figure>
      </section>
    );
};
