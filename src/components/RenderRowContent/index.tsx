import RenderColumncontent from '../RenderColumnContent';

const RenderRowcontent = ({ rows }) => {
  return (
    <div className='group group__rows'>
      {rows &&
        rows.length > 0 &&
        rows.map((row, rowIndex) => {
          return (
            <RenderColumncontent columns={row.columns} key={rowIndex} layoutType={"rows"} />
          );
        })}
    </div>
  );
};

export default RenderRowcontent;
