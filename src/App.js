import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/components/pages/Home";
import View from "../src/components/product/View";
import Update from "../src/components/product/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route exact path="/view/:id" element={<View/>} />
          <Route exact path="/update/:id" element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
