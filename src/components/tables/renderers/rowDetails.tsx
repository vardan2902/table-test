import React, { useEffect, useState } from 'react';
import DetailCell from "./detailCell";
// import { AgGridReact } from "ag-grid-react";

const RowDetails = (props: any) => {
  console.log(props)
  const hiddenCols = props.columnApi.getColumns().filter((el: any) => !el.visible);

  return (
    <div className="ag-details">
      {hiddenCols.map((el: any) => (
        <DetailCell
          key={el.colId}
          data={props.node.data[el.colId]}
          colId={el.colId}
          setRowData={props.context.setRowData}
          rowIndex={props.node.parent.rowIndex}
          rowData={props.context.rowData}
        />
      ))}
    </div>
  );
}

export default RowDetails;