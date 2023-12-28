import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { ProductDisplay } from "../utilities/ProductDisplay";
import { useLocation } from "react-router-dom";

interface Product {
  name: string;
  image: string;
  price: number;
  description: string;
}

export const GenericShopping: React.FC = () => {
  const location = useLocation();
  const decodedTitle = decodeURIComponent(location.pathname).replace(/\//g, " - ");

  const [page, setPage] = useState(0);
  const productsPerPage = 8;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  const productList: Product[] = [
    {
      name: "Product Name",
      image:
        "https://s13emagst.akamaized.net/products/40646/40645023/images/res_3848caf5926b3e18944b38d23478694c.jpg",
      price: 100,
      description: "Product Descriptionawddddddddddddddddddddddddddd dw awdadwawdawdawdaawdhijahfdglahfdsghal kashdflaesuhufihasdkjfh askdjhfluehalhsdjfklh asldfhueihaklshdfkljh kahwdjh",
    },
    {
      name: "Product Name",
      image:
        "https://iq.mikesport.com/cdn/shop/products/f5c9c017494c943311ca615f45d5de75.png?v=1701743568",
      price: 90,
      description: "Product Description",
    },
    {
      name: "Product Name",
      image:
        "https://static.ticimax.cloud/3402/uploads/urunresimleri/buyuk/nike-downshifter-11-siyahsimli-0be-40.jpg",
      price: 120,
      description: "Product Description",
    },
    {
      name: "Product Name",
      image:
        "https://s13emagst.akamaized.net/products/40646/40645023/images/res_3848caf5926b3e18944b38d23478694c.jpg",
      price: 100,
      description: "Product Description",
    },
    {
      name: "Product Name",
      image:
        "https://iq.mikesport.com/cdn/shop/products/f5c9c017494c943311ca615f45d5de75.png?v=1701743568",
      price: 90,
      description: "Product Description",
    },
    {
      name: "Product Name",
      image:
        "https://static.ticimax.cloud/3402/uploads/urunresimleri/buyuk/nike-downshifter-11-siyahsimli-0be-40.jpg",
      price: 120,
      description: "Product Description",
    },
    {
      name: "Product Name",
      image:
        "https://s13emagst.akamaized.net/products/40646/40645023/images/res_3848caf5926b3e18944b38d23478694c.jpg",
      price: 100,
      description: "Product Descriptionawddddddddddddddddddddddddddd dw awdadwawdawdawdaawdhijahfdglahfdsghal kashdflaesuhufihasdkjfh askdjhfluehalhsdjfklh asldfhueihaklshdfkljh kahwdjh",
    },
    {
      name: "Product Name",
      image:
        "https://iq.mikesport.com/cdn/shop/products/f5c9c017494c943311ca615f45d5de75.png?v=1701743568",
      price: 90,
      description: "Product Description",
    },
    {
      name: "Product Name",
      image:
        "https://static.ticimax.cloud/3402/uploads/urunresimleri/buyuk/nike-downshifter-11-siyahsimli-0be-40.jpg",
      price: 120,
      description: "Product Description",
    },
    {
      name: "Product Name",
      image:
        "https://s13emagst.akamaized.net/products/40646/40645023/images/res_3848caf5926b3e18944b38d23478694c.jpg",
      price: 100,
      description: "Product Description",
    },
    {
      name: "Product Name",
      image:
        "https://iq.mikesport.com/cdn/shop/products/f5c9c017494c943311ca615f45d5de75.png?v=1701743568",
      price: 90,
      description: "Product Description",
    },
    {
      name: "Product Name",
      image:
        "https://static.ticimax.cloud/3402/uploads/urunresimleri/buyuk/nike-downshifter-11-siyahsimli-0be-40.jpg",
      price: 120,
      description: "Product Description",
    },
  ];

  const totalPageCount = Math.ceil(productList.length / productsPerPage);

  const slicedProductList = productList.slice(page * productsPerPage, page * productsPerPage + productsPerPage);

  return (
    <>
      <Grid container marginTop={10}>
        <Grid item md={12}>
          <Grid container>
            <Grid item marginBottom={3}>
              <Typography variant="h5" color={"white"}>
                KATEGORIJA {decodedTitle}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={2}>
            {slicedProductList.map((product, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <ProductDisplay product={product} />
              </Grid>
            ))}
          </Grid>
          <Grid container justifyContent="center" marginTop={3}>
            <Grid item>
              <Typography variant="body1" color="white">
                Page {page + 1} of {totalPageCount}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" marginTop={3}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={page === 0}
                onClick={() => handleChangePage(undefined, page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={slicedProductList.length < productsPerPage}
                onClick={() => handleChangePage(undefined, page + 1)}
                style={{ marginLeft: "10px" }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};