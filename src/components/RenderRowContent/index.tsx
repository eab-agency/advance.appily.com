import RenderColumncontent from '../RenderColumnContent';

const RenderRowcontent = ({ rows }) => {
  return (
    <div className='group group__rows'>
      {rows &&
        rows.length > 0 &&
        rows.map((row, rowIndex) => {
          return (
            // <div key={rowIndex} className='group__columns-wrap'>
            <>
              <RenderColumncontent columns={row.columns} />
            </>
            // </div>
          );
        })}
    </div>
  );
};

export default RenderRowcontent;
