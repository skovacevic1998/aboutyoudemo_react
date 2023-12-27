import React, { useEffect, useState } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import { Logo } from "./Logo";
import { GenderType } from "./GenderType";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  handleShowCategoryContent: (
    show: boolean,
    content: React.ReactNode | null
  ) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  handleShowCategoryContent,
}) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Grid
      container
      className={`navbar ${loaded ? "loaded" : ""}`}
      justifyContent="center"
      textAlign="center"
      sx={{ "& > *": { flex: "1 1 auto" } }} // Equal width for each item
    >
      <Grid item xs={3} sm={3} md={1} className="grid-item">
        <GenderType
          label="Žene"
          handleShowContent={handleShowCategoryContent}
        />
      </Grid>
      <Grid item xs={3} sm={3} md={1} className="grid-item">
        <GenderType
          label="Muškarci"
          handleShowContent={handleShowCategoryContent}
        />
      </Grid>
      <Grid item xs={3} sm={3} md={1} className="grid-item">
        <GenderType
          label="Djeca"
          handleShowContent={handleShowCategoryContent}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4} className="grid-item">
        <div className={`logo ${loaded ? "fade-in" : ""}`}>
          <Button disableRipple onClick={() => handleNavigate("/")}>
            <Logo />
          </Button>
        </div>
      </Grid>
      <Grid item xs={3} sm={3} md={1} className="grid-item">
        <IconButton disableRipple style={{ color: "white" }} onClick={() => handleNavigate("/profile")}>
          <PersonIcon />
        </IconButton>
      </Grid>
      <Grid item xs={3} sm={3} md={1} className="grid-item">
        <IconButton disableRipple style={{ color: "white" }} onClick={() => handleNavigate("/favorites")}>
          <FavoriteIcon />
        </IconButton>
      </Grid>
      <Grid item xs={3} sm={3} md={1} className="grid-item">
        <IconButton disableRipple style={{ color: "white" }} onClick={() => handleNavigate("/cart")}>
          <ShoppingBagIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
