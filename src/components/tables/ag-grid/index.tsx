import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react';
import CollapseButton from "../renderers/collapseButton";
import { CellValueChangedEvent, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import RowDetails from "../renderers/rowDetails";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const GridExample = ({columnDefs, data, containerClassName, className, customOptions = {}}: any) => {
  const gridRef: any = useRef();

  const [rowData, setRowData] = useState(data);
  const [hiddenData, setHiddenData]: any = useState([]);

    // const [rowData, setRowData] = useState();

  // const onGridReady = useCallback((params: any) => {
  //   fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  //     .then((resp) => resp.json())
  //     .then((data) => setRowData(data));
  // }, []);

  const onFirstDataRendered = () => {
    gridRef.current.api.sizeColumnsToFit();
  };

  const detailCellRenderer = useMemo(() => {
    return RowDetails;
  }, []);

  const onGridSizeChanged = useCallback((params: any) => {
    const gridWidth = document.getElementById('grid-wrapper')!.offsetWidth;

    const columnsToShow = [];
    const columnsToHide = [];

    let totalColsWidth = 50;
    const allColumns = gridRef.current.columnApi.getColumns();
    if (allColumns && allColumns.length > 0) {
      for (let i = 1; i < allColumns.length; i++) {
        const column = allColumns[i];

        totalColsWidth += column.getMinWidth() || 0;
        if (totalColsWidth > gridWidth) {
          columnsToHide.push(column.getColId());
        } else {
          columnsToShow.push(column.getColId());
        }
      }
    }
    const collapseControl = allColumns[0].getColId();
    if (columnsToHide.length) columnsToShow.push(collapseControl);
    else columnsToHide.push(collapseControl);

    gridRef.current.columnApi.setColumnsVisible(columnsToShow, true);
    gridRef.current.columnApi.setColumnsVisible(columnsToHide, false);
    setHiddenData(columnsToHide);
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const colDef =  useMemo(() => ([
    {
      field: "collapse-btn",
      headerName: '',
      hide: true,
      lockPosition: 'right',
      minWidth: 50,
      maxWidth: 50,
      cellRenderer: CollapseButton,
    },
    ...columnDefs,
  ]), [columnDefs]);

  const onCellValueChanged = (event: CellValueChangedEvent<any>) => {
    const newData = rowData.map((el: any, idx: number) => {
      if (idx === event.node.rowIndex)
        return event.data;
      return el;
    })

    setRowData(newData);
  }

  const defaultColumnDefs = useMemo(() => ({
    resizable: true,
    suppressMenu: true,
    suppressToolPanel: true,
    checkboxSelection: false,
    showDisabledCheckboxes: false,
    headerCheckboxSelection: false,
    lockPosition: true,
    editable: true,
    flex: 1,
  }), []);

  const options: any = useMemo(
    () => ({
      detailRowAutoHeight: true,
      suppressRowClickSelection: true,
      pagination: true,
      paginationPageSize: 10,
      checkboxSelection: false,
      defaultColDef: defaultColumnDefs,
      onFirstDataRendered,
      onGridSizeChanged,
      customButton: CollapseButton,
      masterDetail: true,
      groupSelectsChildren: true,
      enableRangeSelection: true,
      onCellValueChanged,
      columnDefs: colDef,
      rowData: rowData,
      ...customOptions
    }),
    [columnDefs, colDef, defaultColumnDefs, customOptions, rowData, hiddenData, onGridSizeChanged]
  );

  return (
    <div style={containerClassName}>
      <div id="grid-wrapper" style={{ width: '100%', height: '100%' }}>
        <div style={className} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            gridOptions={options}
            detailCellRenderer={detailCellRenderer}
            context={{
              rowData,
              setRowData
            }}
            detailCellRendererParams={{}}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default GridExample;