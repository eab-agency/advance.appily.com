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
        appearance?: 'default' | 'primary' | 'secondary' | 'tertiary';
      };
      id?: string;
    }[];
  };
}
export default function ButtonGroup({ data }: ButtonGroupProps) {
  return (
    <div className="buttonGroup">
      {
        (data?.buttongroupLinks || []).map(({ link }, index) => {
          return (
            <CMSLink
              className="buttonGroup__item"
              key={index}
              {...link} />
          )
        })
      }
    </div>
  )
}
