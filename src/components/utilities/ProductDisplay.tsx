import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

interface Product {
  name: string;
  image: string;
  price: number;
  description: string;
}

interface ProductDisplayProps {
  product: Product;
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isDescriptionHovered, setIsDescriptionHovered] = useState(false);

  return (
    <Grid container>
      <Card
        className="productContainer"
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
      >
        <CardMedia
          component="img"
          alt={product.name}
          height="60%"
          image={product.image}
          title={product.name}
          className={isDescriptionHovered ? "hovered" : ""}
        />

        <CardContent
          className={`productDescription ${showDescription ? "show" : ""}`}
          onMouseEnter={() => setIsDescriptionHovered(true)}
          onMouseLeave={() => setIsDescriptionHovered(false)}
        >
          <Grid container justifyContent={"space-between"}>
            <Grid item>
            <Typography variant="h6">{product.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{product.price}€</Typography>
            </Grid>
          </Grid>
          
          <Typography variant="body2">{product.description}</Typography>
          <Grid container justifyContent={"space-between"}>
            <Grid item md={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => console.log(`Buy ${product.name}`)}
                color="secondary"
              >
                Dodaj u košaricu
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
