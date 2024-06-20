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
import "../../styles/agGrid.css";
import {
  CellClickedEvent,
  ColDef,
} from "ag-grid-community";
import { IOlympicData } from "../../interfaces/interfaces";
import CustomCellRenderer from "./customCellRenderer";
import { GetApi } from "../../services";


const TableMain = () => {

  const gridRef = useRef<AgGridReact<IOlympicData>>(null);
  const rowPin: any = useRef([]);
  const [saves,serSaves]= useState();
  function findWithAttr(array: any[], attr: string, value: string) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  const ragCellClassRules = {
    'rag-green-outer': (params:any) => params.value > 40,
    'rag-yellow-outer': (params:any) => params.value >= 30 && params.value < 40,
    'rag-red-outer': (params:any) => params.value < 30,
  };
  const ragRenderer = (params:any) => {
    return <span className="rag-element">{params.value}</span>;
  };

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const getDefaultCol = (widthChange: number | undefined): ColDef<any>[] => {
    const width = document.getElementById("root")?.offsetWidth || 0;
    if (!widthChange) widthChange = width;

  
    const columnDefs = [
      {
        field: "",
        width: 5,
     
        cellRenderer: CustomCellRenderer,
        sortable: true,
        cellClass: "custom-athlete-cell",
        onCellDoubleClicked: (event: CellClickedEvent) => {
          if (event.rowPinned) {
            const index = findWithAttr(rowPin.current, "CK", event.data.CK);
            if (index != +1) rowPin.current.splice(index, 1);
            gridRef.current!.api.setPinnedTopRowData(rowPin.current);
            gridRef.current!.api.applyTransaction({
              add: [event.data],
            });
          } else {
            const newData = { ...event.data };
            rowPin.current.push(newData);
            gridRef.current!.api.setPinnedTopRowData(rowPin.current);
            console.log("newData:", newData);
            gridRef.current!.api.applyTransaction({
              remove: [event.data],
            });
          }
        },
      },
      {
        field: "CK",
        width: 50,
      },
      {
        headerName: "khớp lệnh",
 
        minWidth: 150,
        marryChildren: true,
        children: [
          {
           
            field: "Giá",
            cellClassRules: ragCellClassRules,
            cellRenderer: ragRenderer,
            width: 70,
            cellStyle: {
              "background-color":
                "var(--color-theme-price-table-col-highlight)",
            },
          },
          {
         
            field: "KL",
            width: 70,
            cellStyle: {
              "background-color":
                "var(--color-theme-price-table-col-highlight)",
            },
          },
          {
           
            field: "+/-",
            width: 70,
            cellStyle: {
              "background-color":
                "var(--color-theme-price-table-col-highlight)",
            },
          },
          {
          
            field: "+/-(%)",
            width: 70,
            cellStyle: {
              "background-color":
                "var(--color-theme-price-table-col-highlight)",
            },
          },
        ],
      },
      {
    
        field: "Trần",
        width: 70,
        cellStyle: {
          color: "rgb(242, 58, 255)",
        },
      },
      {
     
        field: "Sàn",
        width: 70,
        cellStyle: {
          color: "rgb(0, 201, 255)",
        },
      },
      {
  
        field: "TC",
        width: 70,
        cellStyle: {
          color: "var(--color-theme-text-ref)",
        },
      },

      {
        headerName: "bên mua",
        marryChildren: true,
        children: [
          {  field: "Giá3", width: 70 },
          {  field: "KL3", width: 70 },
          { field: "Giá2", width: 70 },
          { field: "KL2", width: 70 },
          {  field: "Giá1", width: 70 },
          {  field: "KL1", width: 70 },
        ],
      },

      {
        headerName: "bên bán",
        marryChildren: true,
        children: [
          { field: "giá1", width: 70 },
          { field: "kL1", width: 70 },
          { field: "giá2", width: 70 },
          { field: "kL2", width: 70 },
          { field: "giá3", width: 70 },
          { field: "kL3", width: 70 },
        ],
      },
          {
            field: "TổngKL",
            width: 90,
            cellStyle: {
           color: "var(--color-theme-text-tertiary)",
              
            },
          },
          {
            field: "Cao",
            width: 70,
            cellStyle: {
              color: "var(--color-theme-text-up)",
            },
          },
          {
            field: "Thấp",
            width: 70,
            cellStyle: {
              color: "var(--color-classic-text-down)",
            },
          },
      

      {
        headerName: "ĐTNN",
        marryChildren: true,
        children: [
          {
            field: "NNmua",
            width: 80,
            cellStyle: {
              color: "var(--color-theme-text-tertiary)",
            },
          },
          {
            field: "NNbán",
            width: 80,
            cellStyle: {
              color: "var(--color-theme-text-tertiary)",
            },
          },
          {
            field: "Room",
            width: 110,
            cellStyle: {
              color: "var(--color-theme-text-tertiary)",
            },
          },
        ],
      },
    ];
    return columnDefs;
  };

  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef<any>[]>(
    getDefaultCol(undefined)
  );

  useEffect(() => {
    const root = document.getElementById("root");
    window.addEventListener("resize", () => {
      setColumnDefs(getDefaultCol(root?.offsetWidth));
    });
  }, []);

  const defaultColDef = useMemo<ColDef<any>>(() => {
    return {
      sortable: true,
      columnDefs: columnDefs,
    };
  }, []);

  function getNewdata() {
    GetApi()
        .then((result) => {
            console.log("Call data:", result.data);
            const data =convertData(result.data .slice(0,30));;
            console.log("data:", data);
            setRowData(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}


  function convertData(data: any) {
    return (
      data.length > 0 &&
      data.map((item: any) => {
        return {
          "": item.stockSymbol,
          CK: item.stockSymbol,
          Giá: new Intl.NumberFormat("en-US").format(item.matchedPrice / 1000),
          KL: item.matchedPrice/100 ,
          "+/-": item.matchedPrice / 1000,
          "+/-(%)": item.matchedPrice/10,
          Trần: item.refPrice / 1000,
          TC: item.refPrice / 1000,
          Sàn: item.floor / 1000,
          //bên mua
          Giá3: item.best3Bid / 1000,
          KL3: item.best3BidVol / 1000,
          Giá2: item.best2Bid / 1000,
          KL2: Intl.NumberFormat("it-IT").format(item.best2BidVol / 10),
          Giá1: item.best1Bid / 1000,
          KL1: new Intl.NumberFormat().format(item.best1BidVol),
          //bên bán
          giá1: item.best1Offer / 1000,
          kL1: new Intl.NumberFormat().format(item.best1OfferVol),
          giá2: item.best2Offer / 1000,
          kL2: new Intl.NumberFormat().format(item.best2OfferVol),
          giá3: item.best3Offer / 1000,
          kL3: new Intl.NumberFormat().format(item.best3OfferVol / 1),

          TổngKL: new Intl.NumberFormat().format(item.nmTotalTradedQty),
          Cao: item.highest / 1000,
          Thấp: item.lowest / 1000,
          NNmua: new Intl.NumberFormat().format(item.buyForeignQtty),
          NNbán: new Intl.NumberFormat().format(item.sellForeignQtty),
          Room: new Intl.NumberFormat().format(item.remainForeignQtty),
        };
      })
    );
  }

  const gridOptions = {
    columnDefs: columnDefs,
  };
  const onGridReady = useCallback((params: any) => {
    getNewdata();
  }, []);

  return (
    <div
    className="price-board-table_main flex-1 overflow-y-auto
     ag-theme-alpine ag-header-row-no-group.ag-header-row-label-left .ag-header-cell-label"
    style={containerStyle}
  >
      <div
        style={gridStyle}
        className={
          "ag-theme-quartz"
        }
      >
        <AgGridReact<IOlympicData>
          rowData={rowData}
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowDragManaged={true}
          animateRows={true}
          sideBar={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default TableMain;
