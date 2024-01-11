import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Fab } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { CustomVideo } from "../utilities/CustomVideo";
import { HomepageDescription } from "../utilities/HomepageDescription";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import textData from "../../data/homepageData.json";

interface AnimatedComponentProps {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  children,
  threshold = 0.5,
  delay = 0,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

export const Homepage: React.FC = () => {
  const videoLocation1 = "/assets/fashionvideo1.mp4";
  const videoLocation2 = "/assets/fashionvideo2.mp4";
  const videoLocation3 = "/assets/fashionvideo3.mp4";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Grid container spacing={4}>
        <Grid item xs={8} marginBottom={50} marginTop={20}>
          <AnimatedComponent>
            <CustomVideo location={videoLocation1} />
          </AnimatedComponent>
        </Grid>
        <Grid item xs={4} marginTop={20}>
          <AnimatedComponent delay={0.6}>
            <Typography className="typography-custom">
              {textData.section1.title}
            </Typography>
            <Typography className="typography-custom">
              {textData.section1.content}
            </Typography>
          </AnimatedComponent>
        </Grid>
        <Grid item xs={4} marginTop={20}>
          <AnimatedComponent delay={0.6}>
            <Typography className="typography-custom">
              {textData.section2.title}
            </Typography>
            <Typography className="typography-custom">
              {textData.section2.content}
            </Typography>
          </AnimatedComponent>
        </Grid>
        <Grid item xs={8} marginBottom={50} marginTop={20}>
          <AnimatedComponent delay={0.2}>
            <CustomVideo location={videoLocation2} />
          </AnimatedComponent>
        </Grid>

        <Grid item xs={4}>
          <AnimatedComponent delay={0.4}>
            <CustomVideo location={videoLocation3} />
          </AnimatedComponent>
        </Grid>

        <Grid item xs={6}>
          <AnimatedComponent delay={0.6}>
            <HomepageDescription />
          </AnimatedComponent>
        </Grid>
        <Grid item xs={10}>
          <AnimatedComponent delay={0.6}>
            <Typography className="typography-custom">
              {textData.section3.title}
            </Typography>
            <Typography className="typography-custom">
              {textData.section3.content}
            </Typography>
          </AnimatedComponent>
        </Grid>
      </Grid>
      <Fab
        color="secondary"
        size="small"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          display: showBackToTop ? "flex" : "none",
        }}
        onClick={scrollToTop}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Container>
  );
};
