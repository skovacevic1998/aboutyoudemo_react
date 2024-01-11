import React, { useState, useEffect, useCallback } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface GenderProps {
  label: string;
  handleShowContent: (show: boolean, content: React.ReactNode | null) => void;
}

export const GenderType: React.FC<GenderProps> = ({
  label,
  handleShowContent,
}) => {
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState<any>(null);
  const [contentFetched, setContentFetched] = useState<boolean>(false);

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const handleClick = async () => {
    try {
      if (!categoryData) {
        const response = await axios.get(
          `http://localhost:8080/api/category/${label}`
        );
        setCategoryData(response.data);
      } else {
        const content = generateContent(categoryData);
        handleShowContent(true, content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateContent = useCallback(
    (data: any): React.ReactNode => {
      return (
        <>
          <Typography
            textTransform={"uppercase"}
            fontWeight={"bold"}
            marginBottom={2}
            fontSize={18}
          >{`Kategorija ${label}`}</Typography>
          <Grid container>
            {data.map((item: any) => (
              <Grid item key={item.id} xs={12}>
                <IconButton
                  disableRipple
                  className="grid-item"
                  style={{
                    color: "white",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onClick={() =>
                    handleNavigate(`/${label}/${item.category_name}`)
                  }
                >
                  <Typography
                    style={{ color: "white", fontSize: 14 }}
                    textTransform={"uppercase"}
                    fontWeight={"bold"}
                    marginBottom={2}
                  >
                    {item.category_name}
                  </Typography>
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </>
      );
    },
    [handleNavigate, label]
  );

  useEffect(() => {
    if (categoryData && !contentFetched) {
      const content = generateContent(categoryData);
      handleShowContent(true, content);
      setContentFetched(true);
      console.log("tu sam");
    }
  }, [categoryData, contentFetched, handleShowContent, generateContent]);

  return (
    <IconButton
      disableRipple
      onClick={handleClick}
      style={{ color: "white", textTransform: "uppercase", fontSize: 18 }}
    >
      {label}
    </IconButton>
  );
};
