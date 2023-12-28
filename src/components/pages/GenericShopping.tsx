import { Grid, Typography } from "@mui/material";
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
  ];

  return (
    <>
      <Grid container marginTop={10} >
        <Grid item md={12}>
          <Grid container>
            <Grid item marginBottom={3}>
              <Typography variant="h5" color={"white"}>
                KATEGORIJA{decodedTitle}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Grid container justifyContent={"space-evenly"}>
            {productList.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} margin={3}>
                <ProductDisplay product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
