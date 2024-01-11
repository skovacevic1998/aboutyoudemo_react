import React, { useRef, useEffect, useState } from "react";
import { Grid } from "@mui/material";

interface CustomVideoProps {
  location: string;
}

export const CustomVideo: React.FC<CustomVideoProps> = ({ location }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFading, setIsFading] = useState<boolean>(false);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = videoElement?.currentTime || 0;
      const duration = videoElement?.duration || 0;

      if (currentTime < 2 || duration - currentTime < 2) {
        setIsFading(true);
      } else {
        setIsFading(false);
      }
    };

    videoElement?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item>
          <div className="custom-video-container video-border">
            <div className="custom-video-strips"></div>
            <video
              ref={videoRef}
              width="400"
              autoPlay
              loop
              onEnded={handleVideoEnd}
              style={{
                opacity: isFading ? 0 : 1,
                transition: "opacity 1s ease-in-out",
                width: "100%",
                height: "100%",
              }}
            >
              <source src={location} type="video/mp4" />
            </video>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
