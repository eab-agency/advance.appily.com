"use client";
import "@/styles/components/modules/SubNavigation.scss";
import Link from "next/link";
import { useState } from "react";
// import { sectionClassNames } from '@/utilities/sectionClassNames'

interface SubNavProps {
  blockName?: string;
  blockType?: string;
  subNavBackgroundColor?: string;
  navigationItem?: SubNavItem[];
}

interface SubNavItem {
  title?: string;
  id: string;
  pageReference: {
    id: string;
    slug: string;
  };
}

function SubNavigation(block: SubNavProps) {
  const {
    blockName,
    // subNavBackgroundColor,
    navigationItem,
  } = block;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };
  return (
    // Note Andrei: if background is not needed for the sub-nav clean up this: <section className={`${sectionClassNames({ backgroundColor: subNavBackgroundColor })} sub-navigation`}>
    <nav className="sub-navigation">
      <div className="group">
        <button
          type="button"
          className={isMenuOpen ? 'resultsBtnOpen' : 'resultsBtnClose'}
          onClick={toggleMenu}
        >
          <h2>{blockName}</h2>
        </button>
        <ul className={`subnav-list ${isMenuOpen && 'resultsOpen'}`}>
          {navigationItem?.map((item) => {
            return (
              <li key={item.id} className='subnav-list__item'>
                <Link href={item?.pageReference?.slug}>{item?.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default SubNavigation;
