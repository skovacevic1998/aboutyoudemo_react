import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FooterComponent, GenericShopping, Homepage, Navbar, ShoppingCart } from "./components";
import "./css/custom_style.css";

function App(): JSX.Element {
  const [contentState, setContentState] = useState<{
    visible: boolean;
    content: React.ReactNode | null;
  }>({ visible: false, content: null });

  const contentRef = useRef<HTMLDivElement>(null);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleShowCategoryContent = (
    show: boolean,
    newContent: React.ReactNode | null
  ): void => {
    if (!buttonClicked) {
      setButtonClicked(true);
    }
    setContentState({ visible: show, content: show ? newContent : null });
  };

  useEffect(() => {
    const handleInitialFadeIn = (): void => {
      if (contentRef.current) {
        contentRef.current.classList.add("fade-in");
      }
    };
  
    handleInitialFadeIn();
  
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setButtonClicked(false);
      }
    };
  
    document.body.addEventListener("mousedown", handleClickOutside);
  
    const cleanup = () => {
      if (contentRef.current) {
        contentRef.current.classList.remove("fade-in");
      }
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  
    return cleanup;
  }, []); 

  useEffect(() => {
    if (!buttonClicked) {
      setContentState({ visible: false, content: null });
    }
  }, [buttonClicked]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="background" />
        <Navbar handleShowCategoryContent={handleShowCategoryContent} />
        {buttonClicked && (
          <div
            ref={contentRef}
            className={`category-content ${contentState.visible ? "active" : ""}`}
          >
            {contentState.content}
          </div>
        )}
        <div className={`aboutyou-content ${loaded ? "loaded" : ""}`}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<div>Profile</div>} />
            <Route path="/favorites" element={<div>Favorite</div>} />
            <Route path="/cart" element={<ShoppingCart/>} />
            <Route path="/Djeca/Obuća" element={<GenericShopping/>} />
          </Routes>
        </div>
        <div className={`footer ${loaded ? "loaded" : ""}`}>
          <FooterComponent />
        </div>
      </div>
    </Router>
  );
}

export default App;
