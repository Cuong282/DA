import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PriceBoard from "./pages/PriceBoard";
import Nopage from "./pages/Nopage";
import Layout from "./Layouts/Layout";
import IndexList from "./pages/Nopage/indexlist";


const Demo = () => {
  return <div>demo</div>;
};


const App = () => {
  return (
 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PriceBoard />} />
          <Route path="/s-products" element={<Nopage />} />
          <Route path="/theodoi" element={<IndexList />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
  

};
export default App;
