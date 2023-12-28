import React, { useState } from "react";
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

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ShoppingCartProps {
  cartItems: Product[];
  removeFromCart: (id: number) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cartItems,
  removeFromCart,
}) => {
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrderConfirm = () => {
    const randomOrderNumber = Math.floor(Math.random() * 100000);
    setOrderNumber(randomOrderNumber);
    setOrderConfirmed(true);
    removeFromCart(-1); // Pass a special id (-1) to indicate order confirmation
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
                  <Avatar alt={item.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="body2"
                        className="text"
                        color="textPrimary"
                      >
                        Količina: {item.quantity}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text"
                        color="textPrimary"
                      >
                        Cijena: {item.price * item.quantity}€
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeFromCart(item.id)}
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
                    Ukupna cijena: {totalPrice}€
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
