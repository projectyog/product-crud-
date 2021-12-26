import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from '../src/components/Header';
import AddProduct from '../src/components/AddProduct';
import ProductList from '../src/components/ProductList';
import useLocalStorage from '../src/hooks/useLocalStorage';
import EditProduct from '../src/components/EditProduct';
import ProductsContext from '../src/context/ProductsContext';

const App = () => {
  const [products, setProduct] = useLocalStorage('products', []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <ProductsContext.Provider value={{ products, setProduct }}>
            <Routes>
              <Route element={<ProductList />} path="/" exact={true} />
              <Route element={<AddProduct />} path="/add" />
              <Route element={<EditProduct />} path="/edit/:id" />
              <Route element={() => <Navigate replace="/" />} />
            </Routes>
          </ProductsContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;