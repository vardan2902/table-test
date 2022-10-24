import React, { useState } from 'react';

const DetailCell = (props: any) => {
  const [value, setValue] = useState(props.data);

  const handleBlur = () => {
    const newData = props.rowData.map((el: any, idx: number) => {
      if (idx === props.rowIndex) el[props.colId] = value;
      return el;
    });
    props.setRowData(newData);
  }

  return (
    <div key={props.colId} className="ag-details-row">
      <h3>{props.colId}</h3>
      <input
        type="text"
        value={value}
        onChange={({target: {value}}) => setValue(value)}
        onBlur={() => handleBlur()}
      />
    </div>
  );
}

export default DetailCell;