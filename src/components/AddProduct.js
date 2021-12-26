import React, { useContext } from 'react';
import ProductForm from './ProductForm';
import ProductsContext from '../context/ProductsContext';
import { useNavigate} from 'react-router-dom';

const AddProduct = () => {
  const { products, setProduct } = useContext(ProductsContext);
   const navigate = useNavigate();
  const handleOnSubmit = (product) => {
    setProduct([product, ...products]);
    navigate('/');
  };

  return (
    <React.Fragment>
      <ProductForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddProduct;