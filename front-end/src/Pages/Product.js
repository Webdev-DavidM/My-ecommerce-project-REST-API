import React from 'react';

const Product = ({ match }) => {
  return <div>Product {match.params.id}</div>;
};

export default Product;
