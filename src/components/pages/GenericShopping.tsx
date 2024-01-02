import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { ProductDisplay } from "../utilities/ProductDisplay";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store/store";
import { fetchProductsData } from "../../redux/actions/actions";
import { Product } from "../../redux/types/types";

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

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

  const [page, setPage] = useState(0);
  const productsPerPage = 8;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const productList = useSelector((state: RootState) => state.products);

  const slicedProductList = Array.isArray(productList)
    ? productList.slice(
        page * productsPerPage,
        page * productsPerPage + productsPerPage
      )
    : [];

  useEffect(() => {
    console.log(categoryForAPI);
    dispatch(fetchProductsData(categoryForAPI));
  }, [dispatch, categoryForAPI]);

  const totalPageCount = Math.ceil(productList.length / productsPerPage);

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
            {Array.isArray(productList) ? (
              productList.map((product: any, index: number) => (
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
