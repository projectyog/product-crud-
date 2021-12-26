import React, { useContext } from 'react';
import ProductForm from './ProductForm';
import { useParams ,useNavigate} from 'react-router-dom';
import ProductsContext from '../context/ProductsContext';

const EditProduct = () => {
  const { products, setProduct } = useContext(ProductsContext);
  const { id } = useParams();
  const productToEdit = products.find((product) => product.id === id);
  const navigate = useNavigate()
  const handleOnSubmit = (product) => {
    const filteredProducts = products.filter((product) => product.id !== id);
    setProduct([product, ...filteredProducts]);
    navigate('/');
  };

  return (
    <div>
      <ProductForm product={productToEdit} handleOnSubmit={handleOnSubmit} />
    </div>
  );
};

export default  EditProduct;