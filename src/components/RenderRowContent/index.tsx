import RichText from '../RichText';
import { Stats } from '../Stats';
import classes from './index.module.scss';

const RenderRowcontent = ({ rows }) => {
  return (
    <div className={classes.rowcontent}>
      {rows &&
        rows.length > 0 &&
        rows.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className={classes.row}>
              {row.blocks &&
                row.blocks.map((block, blockIndex) => {
                  return (
                    <div key={blockIndex}>
                       {blockRenderers[block.blockType](block)}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

const blockRenderers = {
    stats: (block) => <Stats stats={block} />,
    richText: (block) => <RichText content={block.richText} />
  };
export default RenderRowcontent;