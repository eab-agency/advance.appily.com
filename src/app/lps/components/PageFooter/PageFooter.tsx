import { PreFooter } from '../PreFooter/PreFooter';

const theDate = new Date();
const year = theDate.getFullYear();

export const PageFooter = () => {
  return (
    <>
    <PreFooter />
    <footer className="bg-brand-navy-blue py-fluid-lg px-fluid-lg text-center">
    <div className="container-wide flex flex-col gap-fluid-md">
      <nav>
        <ul className="flex flex-wrap justify-center gap-fluid-lg text-sm">
          <li><a href="#" className="text-white" target="_blank">About Us</a></li>
          <li><a href="#" className="text-white" target="_blank">Terms and Conditions</a></li>
          <li><a href="#" className="text-white" target="_blank">California Privacy Notice</a></li>
          <li><a href="#" className="text-white" target="_blank">Do Not Sell or Share My Personal Information</a></li>
          <li><a href="#" className="text-white" target="_blank">Data Attribution</a></li>
          <li><a href="#" className="text-white" target="_blank">Privacy Preferences</a></li>
        </ul>
      </nav>
      <p className="text-xs text-white ">© {year} Appily Advance. All rights reserved.</p>
      </div>
  </footer>
    </>
  )
}
