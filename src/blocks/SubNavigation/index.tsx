import { sectionClassNames } from '@/utilities/sectionClassNames'

interface SubNavProps {
  blockName?: string;
  blockType?: string;
  subNavBackgroundColor?: string;
  navigationItem?: SubNavItem[];
}

interface SubNavItem {
  title?: string;
  url?: string;
  id: string;
}

function SubNavigation(block: SubNavProps) {
  const {
    blockName,
    subNavBackgroundColor,
    navigationItem,
  } = block;
  return (
    // <section className={`${sectionClassNames({ backgroundColor: subNavBackgroundColor })} sub-navigation`}>
    <nav className="sub-navigation">
      <div className="group">
        <h2>{blockName}</h2>
        <ul className="subnav-list">
          {navigationItem?.map((item) => {
            return (
              <li key={item.id} className='subnav-list__item'>
                <a href={item.url}>{item.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default SubNavigation;
