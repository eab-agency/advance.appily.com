import Image from 'next/image';

export const PageHead = () => {
  return (
    <div className='py-fluid-lg px-fluid-md'>
      <div className='container-wide'>
        <figure className='logo relative'>
          <Image
            src="./images/Appily-Advance-Horizontal-Logo.svg"
            alt="Appily Advance Logo"
            fill
            sizes='(max-width: 640px) 100vw, 80vw'
            />
        </figure>
      </div>
    </div>
  )
}
