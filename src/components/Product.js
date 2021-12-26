import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Product = ({
  id,
  images,
  productname,
  price,
  handleRemoveProduct
}) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }} className="product">
      <Card.Body>
      <img src={images} alt="no-images" style={{width:"100%"}}/>
        <Card.Title className="product-title">{productname}</Card.Title>
        <div className="product-details">
          <div>Price: {price} </div>
        </div>
        <Button variant="primary" onClick={() => navigate(`/edit/${id}`)}>
          Edit
        </Button>{' '}
        <Button variant="danger" onClick={() => handleRemoveProduct(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;