import React from "react";
import BoxChart from "./BoxChart";
import Menu from "./MenuPriceBoard";
import TableMain from "./TableMain";
import Buttom from "./buttom";

const PriceBoard = () => {
  return (
    <div className="flex-1 flex flex-col">

      <BoxChart />
      <Menu />
      <TableMain />
      {/* <Buttom />  */}

    </div>
  );
};

export default PriceBoard;
