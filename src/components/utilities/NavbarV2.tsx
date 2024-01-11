import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Logo } from "./Logo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { GenderType } from "./GenderType";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

interface NavbarProps {
  handleShowCategoryContent: (
    show: boolean,
    content: React.ReactNode | null
  ) => void;
}

export const NavbarV2: React.FC<NavbarProps> = ({
  handleShowCategoryContent,
}) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const [loaded, setLoaded] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleCategoryClick = (category: string) => {
    handleMenuClose();

    switch (category) {
      case "Žene":
      case "Muškarci":
      case "Djeca":
      default:
        break;
    }
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const isMobileSize = useMediaQuery("(max-width:900px)");

  const [submenuAnchor, setSubmenuAnchor] = React.useState<null | HTMLElement>(
    null
  );

  const handleSubmenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSubmenuAnchor(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchor(null);
  };

  const cartItemsCount = useSelector(
    (state: RootState) => state.cart.products.length
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }} className={`navbar ${loaded ? "loaded" : ""}`}>
        <AppBar position="fixed">
          <Toolbar>
            {isMobileSize ? (
              <Box className="grid-item" color="white">
                <IconButton onClick={handleMenuOpen}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => handleCategoryClick("Žene")}
                    className="grid-item"
                  >
                    <GenderType
                      label="Žene"
                      handleShowContent={handleShowCategoryContent}
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleCategoryClick("Muškarci")}
                    className="grid-item"
                  >
                    <GenderType
                      label="Muškarci"
                      handleShowContent={handleShowCategoryContent}
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleCategoryClick("Djeca")}
                    className="grid-item"
                  >
                    <GenderType
                      label="Djeca"
                      handleShowContent={handleShowCategoryContent}
                    />
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Box className="grid-item">
                  <GenderType
                    label="Žene"
                    handleShowContent={handleShowCategoryContent}
                  />
                </Box>
                <Box className="grid-item">
                  <GenderType
                    label="Muškarci"
                    handleShowContent={handleShowCategoryContent}
                  />
                </Box>
                <Box className="grid-item">
                  <GenderType
                    label="Djeca"
                    handleShowContent={handleShowCategoryContent}
                  />
                </Box>
              </>
            )}

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "right",
                textAlign: "center",
              }}
            >
              <Box className="grid-item">
                <div className={`logo ${loaded ? "fade-in" : ""}`}>
                  <IconButton disableRipple onClick={() => handleNavigate("/")}>
                    <Logo />
                  </IconButton>
                </div>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                disableRipple
                style={{ color: "white" }}
                onClick={() => handleNavigate("/shoppingcart")}
              >
                <Badge
                  className="grid-item"
                  badgeContent={cartItemsCount}
                  color="error"
                >
                  <ShoppingBagIcon />
                </Badge>
              </IconButton>

              <IconButton
                disableRipple
                style={{ color: "white" }}
                onClick={() => handleNavigate("/favorites")}
              >
                <Badge className="grid-item">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
              <IconButton
                disableRipple
                style={{ color: "white" }}
                onClick={() => handleNavigate("/profile")}
              >
                <Badge className="grid-item">
                  <PersonIcon />
                </Badge>
              </IconButton>
            </Box>
            <Box
              sx={{ display: { xs: "flex", md: "none" } }}
              className="iconsubmenu"
            >
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                color="inherit"
                onClick={handleSubmenuOpen}
              >
                <MoreIcon />
              </IconButton>
              <Menu
                id="submenu"
                anchorEl={submenuAnchor}
                open={Boolean(submenuAnchor)}
                onClose={handleSubmenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => handleNavigate("/shoppingcart")}>
                  <IconButton disableRipple style={{ color: "white" }}>
                    <Badge className="grid-item">
                      <ShoppingBagIcon />
                    </Badge>
                  </IconButton>
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/favorites")}>
                  <IconButton disableRipple style={{ color: "white" }}>
                    <Badge className="grid-item">
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/profile")}>
                  <IconButton disableRipple style={{ color: "white" }}>
                    <Badge className="grid-item">
                      <PersonIcon />
                    </Badge>
                  </IconButton>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};
