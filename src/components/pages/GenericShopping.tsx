import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { ProductDisplay } from "../utilities/ProductDisplay";
import { useLocation } from "react-router-dom";
import { Product } from "../../redux/types/types";
import axios from "axios";

export const GenericShopping: React.FC = () => {
  const location = useLocation();

  const decodedTitle = decodeURIComponent(location.pathname).replace(
    /\//g,
    " - "
  );
  const categoryForAPI = decodeURIComponent(location.pathname).replace(
    /\//g,
    ""
  );

  const [page, setPage] = useState(0);
  const productsPerPage = 8;

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const [productList, setProductList] = useState<Product[]>([]);
  const [totalPageCount, setTotalPageCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${categoryForAPI}?page=${page}&size=${productsPerPage}`
        );
        const { content, totalPages } = response.data;
        setProductList(content);
        setTotalPageCount(totalPages);
      } catch (error) {}
    };

    fetchProducts();
  }, [categoryForAPI, page, productsPerPage]);

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
            {productList.length > 0 ? (
              productList.map((product: Product, index: number) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <ProductDisplay product={product} />
                </Grid>
              ))
            ) : (
              <Grid item>
                <Typography variant="body1" color="white">
                  No products available
                </Typography>
              </Grid>
            )}
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
                onClick={() => handleChangePage(page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={page + 1 >= totalPageCount}
                onClick={() => handleChangePage(page + 1)}
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
