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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { removeFromCart } from "../../redux/slice/cartSlice";

export const ShoppingCart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();

  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.product_price * item.product_orders_in_cart,
      0
    );
  }, [cartItems]);

  const handleOrderConfirm = () => {
    const randomOrderNumber = Math.floor(Math.random() * 100000);
    setOrderNumber(randomOrderNumber);
    setOrderConfirmed(true);
  };

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

  return (
    <Paper className="cartContainer" style={{ marginTop: 100 }}>
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
              >
                Potvrdi narudžbu
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
    </Paper>
  );
};
