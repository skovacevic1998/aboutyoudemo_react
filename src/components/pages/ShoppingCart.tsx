import React, { useMemo, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Paper,
  Button,
  Container,
  Grid,
  TextField,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { clearCart, removeFromCart } from "../../redux/slice/cartSlice";
import axios from "axios";

export const ShoppingCart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();

  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.product_price * item.product_orders_in_cart,
      0
    );
  }, [cartItems]);

  const handleOrderConfirm = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/confirmOrder", {
        cartItems,
        userName,
        userSurname,
        userAddress,
        userCity,
        userZipcode,
        userEmail,
      });

      const confirmedOrderNumber = response.data.orderNumber;

      setOrderNumber(confirmedOrderNumber);
      setOrderConfirmed(true);

      dispatch(clearCart());
    } catch (error) {
      console.error("Error confirming order:", error);
    } finally {
      setLoading(false);
    }
  };

  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const [userName, setUserName] = useState<string>("");
  const [userSurname, setUserSurname] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userCity, setUserCity] = useState<string>("");
  const [userZipcode, setUserZipcode] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const isFormValid =
    userName !== "" &&
    userSurname !== "" &&
    userAddress !== "" &&
    userCity !== "" &&
    userZipcode !== "" &&
    userEmail !== "" &&
    termsAccepted;

  const formatProductPrice = (price: number) => {
    const decimalFormat = new Intl.NumberFormat("hr-HR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    });
    return decimalFormat.format(price);
  };

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: 20 }}>
        <Paper className="cartContainer" style={{ marginTop: 100 }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom className="heading">
                Košarica
              </Typography>
              <Divider />
              <List>
                {cartItems.length === 0 && !orderConfirmed ? (
                  <Typography variant="body1" className="emptyCartText">
                    Vaša košarica je prazna.
                  </Typography>
                ) : (
                  cartItems.map((item) => (
                    <React.Fragment key={item.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={item.product_name} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.product_name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                variant="body2"
                                className="text"
                                color="textPrimary"
                              >
                                Količina: {item.product_orders_in_cart}
                              </Typography>
                              <Typography variant="body2">{`Cijena: ${item.product_price_formatted}`}</Typography>
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))
                )}
                {cartItems.length !== 0 && !orderConfirmed && (
                  <>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography
                            variant="h6"
                            className="totalPrice"
                            color="primary"
                          >
                            Ukupna cijena: {formatProductPrice(totalPrice)}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOrderConfirm}
                        disabled={!isFormValid || loading}
                      >
                        {loading
                          ? "Potvrđujem narudžbu..."
                          : "Potvrdi narudžbu"}
                      </Button>
                    </ListItem>
                  </>
                )}
                {orderNumber && orderConfirmed && (
                  <>
                    <ListItem>
                      <Typography variant="body1">
                        Vaša narudžba je potvrđena. Hvala vam na kupovini!
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography variant="body1">
                        Vaš broj narudžbe: {orderNumber}
                      </Typography>
                    </ListItem>
                  </>
                )}
              </List>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} justifyContent={"space-evenly"}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom className="heading">
                    Informacije dostave
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="user-name"
                    label="Ime"
                    variant="outlined"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="user-surname"
                    label="Prezime"
                    variant="outlined"
                    required
                    value={userSurname}
                    onChange={(e) => setUserSurname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="user-address"
                    label="Ulica i kućni broj"
                    variant="outlined"
                    required
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="user-city"
                    label="Grad"
                    variant="outlined"
                    required
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="user-zipcode"
                    label="Poštanski broj"
                    variant="outlined"
                    required
                    type="number"
                    value={userZipcode}
                    onChange={(e) => setUserZipcode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="user-email"
                    label="Email adresa"
                    variant="outlined"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    error={userEmail !== "" && !isEmailValid(userEmail)}
                    helperText={
                      userEmail !== "" && !isEmailValid(userEmail)
                        ? "Neispravna email adresa"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom className="heading">
                    <Checkbox
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      required
                    />
                    Prihvaćam uvjete korištenja
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom className="heading">
                    Dostava je isključivo pouzećem.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
