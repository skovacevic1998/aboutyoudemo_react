import React, { useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { fetchCategoryData } from "../../redux/actions/actions";
import { Action } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

interface GenderProps {
  label: string;
  handleShowContent: (show: boolean, content: React.ReactNode | null) => void;
}

export const GenderType: React.FC<GenderProps> = ({
  label,
  handleShowContent,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

  const categoryData = useSelector((state: RootState) => state.category);

  const handleClick = async () => {
    try {
      if (!categoryData[label]) {
        await dispatch(fetchCategoryData(label));
      } else {
        const content = generateContent(categoryData[label]);
        handleShowContent(true, content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const generateContent = (data: any): React.ReactNode => {
    return (
      <>
        <Typography
          textTransform={"uppercase"}
          fontWeight={"bold"}
          marginBottom={2}
        >{`Kategorija ${label}`}</Typography>
        <Grid container>
          {data.map((item: any) => (
            <Grid item key={item.id} xs={12}>
              <Button
                disableRipple
                className="grid-item"
                style={{
                  color: "black",
                  transition: "transform 0.3s ease-in-out",
                }}
                onClick={() => handleNavigate(`/${label}/${item.category_name}`)}
              >
                {item.category_name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      dispatch(fetchCategoryData(label));
      console.log("updated category")
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, [dispatch, label]);

  return (
    <Button
      disableRipple
      onClick={handleClick}
      variant="text"
      style={{ color: "white" }}
    >
      {label}
    </Button>
  );
};
