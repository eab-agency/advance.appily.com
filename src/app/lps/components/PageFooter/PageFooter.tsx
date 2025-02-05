"use client";
import { PreFooter } from '../PreFooter/PreFooter';

const theDate = new Date();
const year = theDate.getFullYear();

export const PageFooter = () => {

  const privacyClick = () => {
    console.log('privacyClick');
    if (
      typeof window.OneTrust === "undefined" ||
      typeof window.OneTrust.ToggleInfoDisplay !== "function"
    ) {
      return;
    }
    window.OneTrust.ToggleInfoDisplay();
  };

  return (
    <>
    <PreFooter />
    <footer className="bg-brand-navy-blue py-fluid-lg px-fluid-lg text-center">
    <div className="container-wide flex flex-col gap-fluid-md">
      <nav>
        <ul className="flex flex-wrap justify-center gap-fluid-lg text-sm">
          <li><a href="https://www.appily.com/about" className="text-white" target="_blank">About Us</a></li>
          <li><a href="https://www.appily.com/terms-and-conditions" className="text-white" target="_blank">Terms and Conditions</a></li>
          <li><a href="https://www.appily.com/privacy-policy" className="text-white" target="_blank">Privacy Policy</a></li>
          <li><a href="https://privacy.eab.com/appily-cs-tours-CA" className="text-white" target="_blank">California Privacy Notice</a></li>
          <li><a href="https://www.appily.com/your-privacy-rights" className="text-white" target="_blank">Do Not Sell or Share My Personal Information</a></li>
          <li><a href="https://www.appily.com/data" className="text-white" target="_blank">Data Attribution</a></li>
          <li><a className="text-white cursor-pointer" target="_blank" onClick={privacyClick}>Privacy Preferences</a></li>
        </ul>
      </nav>
      <p className="text-xs text-white ">© {year} Appily Advance. All rights reserved.</p>
      </div>
  </footer>
    </>
  )
}
