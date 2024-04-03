import RenderColumncontent from '../RenderColumnContent';

const RenderRowcontent = ({ rows }) => {
  return (
    <div>
      {rows &&
        rows.length > 0 &&
        rows.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
                <RenderColumncontent columns={row.columns} />
            </div>
          );
        })}
    </div>
  );
};

export default RenderRowcontent;