import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid, Modal, Box } from "@mui/material";
import { Product } from "../../redux/types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";

interface ProductDisplayProps {
  product: Product;
}

const formatProductPrice = (price: number): string => {
  const decimalFormat = new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
  return decimalFormat.format(price);
};

export const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isDescriptionHovered, setIsDescriptionHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    console.log(`Buy ${product.product_name}`);
  };

  const handleAddToCartButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    handleAddToCart();
  };

  return (
    <Grid container>
      <Card
        className="productContainer"
        onClick={handleModalOpen}
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
      >
        <CardMedia
          component="img"
          alt={product.product_name}
          style={{ objectFit: "contain", height: "100%", width: "100%" }}
          image={product.product_image}
          title={product.product_name}
          className={isDescriptionHovered ? "hovered" : ""}
        />

        <CardContent
          className={`productDescription ${showDescription ? "show" : ""}`}
          onMouseEnter={() => setIsDescriptionHovered(true)}
          onMouseLeave={() => setIsDescriptionHovered(false)}
        >
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Typography variant="h6">{product.product_name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {formatProductPrice(product.product_price)}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="body2">{`Veličina: ${product.product_size}`}</Typography>
          <br />
          <Grid container justifyContent={"center"}>
            <Grid item md={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleAddToCartButtonClick}
                color="secondary"
              >
                Dodaj u košaricu
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="product-modal"
        aria-describedby="product-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 600,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {product.product_name}
          </Typography>
          <CardMedia
            component="img"
            alt={product.product_name}
            height="300"
            image={product.product_image}
            title={product.product_name}
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="h5">
            {formatProductPrice(product.product_price)}
          </Typography>

          <Typography
            variant="body1"
            gutterBottom
          >{`Boja: ${product.product_color}`}</Typography>
          <Typography
            variant="body1"
            gutterBottom
          >{`Veličina: ${product.product_size}`}</Typography>
          <Typography
            variant="body1"
            gutterBottom
          >{`Dizajn: ${product.product_design}`}</Typography>
          <Typography
            variant="body1"
            gutterBottom
          >{`Kroj: ${product.product_cut}`}</Typography>
          <Typography
            variant="body1"
            gutterBottom
          >{`Materijal: ${product.product_material}`}</Typography>
          <Typography
            variant="body1"
            gutterBottom
          >{`Dostupnost: ${product.product_availability}`}</Typography>
          <br />
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleAddToCart}
              color="secondary"
            >
              Dodaj u košaricu
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};
