import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";

import { IOlympicData } from "../../interfaces/interfaces";

const TableMain = () => {
  const getWidthFromPercent = (Percent: number, width: number): number => {
    return width / Percent;
  };

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const getDefaultCol = (widthChange: number | undefined): ColDef[] => {
    const width = document.getElementById("root")?.offsetWidth || 0;
    if (!widthChange) widthChange = width;
    const colDef: ColDef[] = [
      {
        headerName: "CK",
        field: "athlete",
        width: getWidthFromPercent(10, widthChange),
        pinned: "left",
        lockPinned: true,

      },
      {
        headerName: "TC",
        field: "age",
        width: getWidthFromPercent(10, widthChange),
      },
      {
        headerName: "Trần",
        field: "age",
        width: getWidthFromPercent(10, widthChange),
      },
      {
        headerName: "Sàn",
        field: "age",
        width: getWidthFromPercent(10, widthChange),
      },
      { field: "country", width: getWidthFromPercent(10, widthChange) },
      { field: "year", width: getWidthFromPercent(10, widthChange) },
      { field: "date", width: getWidthFromPercent(10, widthChange) },
      { field: "sport", width: getWidthFromPercent(10, widthChange) },
      { field: "gold", width: getWidthFromPercent(10, widthChange) },
      { field: "silver", width: getWidthFromPercent(10, widthChange) },
      { field: "bronze", width: getWidthFromPercent(10, widthChange) },
      { field: "total", width: getWidthFromPercent(10, widthChange) },
    ];
    return colDef;
  };

  const [rowData, setRowData] = useState<IOlympicData[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(
    getDefaultCol(undefined)
  );

  useEffect(() => {
    const root = document.getElementById("root");
    window.addEventListener("resize", () => {
      setColumnDefs(getDefaultCol(root?.offsetWidth));
    });
  }, []);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setRowData([
      {
        athlete: "Michael Phelps",
        age: 23,
        country: "United States",
        year: 2008,
        date: "24/08/2008",
        sport: "Swimming",
        gold: 8,
        silver: 0,
        bronze: 0,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 29,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: "Michael Phelps",
        age: 19,
        country: "United States",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
    ]);
  }, []);

  return (
    <div className="  flex-1 cf-table-main  dark:border-gray-700 text-theme-text-tertiary bg-theme-secondary "
    
    style={containerStyle}>
      <div className="h-full  ">
        <div className="ag-root-wrapper ag-layout-normal ag-ltr">
          <AgGridReact<IOlympicData>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default TableMain;