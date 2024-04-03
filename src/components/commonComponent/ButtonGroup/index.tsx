import { Button } from "@/components/Button"
import { CMSLink } from "@/components/Link"

interface ButtonGroupProps {
    data:{
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
export default function ButtonGroup({data}: ButtonGroupProps){
    console.log(data,'button**')
    return(
        <ul>
           
           {data?.buttongroupLinks.length> 0 &&
            (data?.buttongroupLinks || []).map(({ link }, index)=>{
              return(
                
                <CMSLink key={index} {...link} className="button btn-primary btn-click-quiz" />
              
              )
            })
            }
          </ul>
    )
}