import Image from 'next/image';

export const PageHead = () => {
  return (
    <div className='py-fluid-lg'>
      <div className='container-wide'>
        <figure className='relative' style={{width:'clamp(10rem, 20vw, 20rem)', height:'clamp(2rem, 4vw, 4rem)'}}>
          <Image
            src="../../images/Appily-Advance-Horizontal-Logo.svg"
            alt="Appily Advance Logo"
            fill
            sizes='(max-width: 640px) 100vw, 80vw'
            />
        </figure>
      </div>
    </div>
  )
}
