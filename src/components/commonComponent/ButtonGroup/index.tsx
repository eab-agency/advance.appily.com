import { Button } from "@/components/Button"
import { CMSLink } from "@/components/Link"
import "@/styles/blocks/ButtonGroup.scss"

interface ButtonGroupProps {
  data: {
    buttongroupLinks?: {
      link: {
        type?: 'reference' | 'custom';
        newTab?: boolean;
        reference: {
          value: string;
          relationTo: 'pages';
        };
        url: string;
        label: string;
        appearance?: 'default' | 'primary' | 'secondary';
      };
      id?: string;
    }[];
  };
}
export default function ButtonGroup({ data }: ButtonGroupProps) {
  return (
    <ul className="buttonGroup">
      {data?.buttongroupLinks?.length > 0 &&
        (data?.buttongroupLinks || []).map(({ link }, index) => {
          return (
            <li className="buttonGroup__item">
              <CMSLink key={index} {...link} />
            </li>
          )
        })
      }
    </ul>
  )
}
