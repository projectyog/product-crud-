import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const ProductForm = (props) => {
  const [product, setProduct] = useState(() => {
    return {
      images: props.images ? props.book.images : '',
      productname: props.productname ? props.book.productname : '',
      price: props.price? props.book.price : ''
    };
  });

  const [errorMsg, setErrorMsg] = useState('');
  const { productname, price, images } = product;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [productname, images, price];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const product = {
        id: uuidv4(),
        productname,
        images,
        price,
      };
      props.handleOnSubmit(product);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'price':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setProduct((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setProduct((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="images">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            className="input-control"
            type="url"
            name="images"
            value={images}
            placeholder="Enter Image of product"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="productname">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            className="input-control"
            type="string"
            name="productname"
            value={productname}
            placeholder="Enter Product Name"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="price"
            value={price}
            placeholder="Enter price of Product"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;