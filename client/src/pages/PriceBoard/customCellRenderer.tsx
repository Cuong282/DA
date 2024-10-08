import React, { useEffect, useRef } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { BsFillPinAngleFill } from "react-icons/bs";

const CustomCellRenderer = (props: ICellRendererParams<any, any, any>) => {
  const myRef = useRef(null);

  useEffect(() => {
    props.registerRowDragger(myRef.current!);
  });

  return (
    <div className="my-custom-cell-renderer w-full h-full">
      <div className="w-full h-full " ref={myRef}>
        <div className="pin">
          <BsFillPinAngleFill />
        </div>
      </div>
      <div className="w-full h-full "ref={myRef}> 
       </div>
    </div>
  );
};
export default CustomCellRenderer;
