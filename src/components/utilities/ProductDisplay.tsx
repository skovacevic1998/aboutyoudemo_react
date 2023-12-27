import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Product {
  name: string;
  image: string;
  description: string;
}

interface ProductDisplayProps {
  product: Product;
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Card
      className="productContainer"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <CardMedia
        component="img"
        alt={product.name}
        height="200"
        image={product.image}
        title={product.name}
      />

      <CardContent className={`productDescription ${showDescription ? 'show' : ''}`}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Button variant="contained" onClick={() => console.log(`Buy ${product.name}`)}>
          Buy
        </Button>
      </CardContent>
    </Card>
  );
};