import React from "react";
import { Carousel } from "antd";

const ImageRow1: React.FC = React.memo(() => {
  return (
    <div className="carousel-row">
      <img
        className="carousel-img"
        src="https://images.unsplash.com/photo-1566206091558-7f218b696731?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGZhc2hpb258ZW58MHx8MHx8fDA%3D"
        alt="img1"
      />
      <img
        className="carousel-img"
        src="https://images.unsplash.com/photo-1608623643122-ba620a693c3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjcwfHxmYXNoaW9ufGVufDB8fDB8fHww"
        alt="img2"
      />
      <img
        className="carousel-img"
        src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzAyfHxmYXNoaW9ufGVufDB8fDB8fHww"
        alt="img3"
      />
    </div>
  );
});

const ImageRow2: React.FC = React.memo(() => {
  return (
    <div className="carousel-row">
      <img
        className="carousel-img"
        src="https://images.unsplash.com/photo-1567769568058-46bf07221c68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA0fHxmYXNoaW9ufGVufDB8fDB8fHww"
        alt="img1"
      />
      <img
        className="carousel-img"
        src="https://images.unsplash.com/photo-1572251337078-1063752b2a35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzAzfHxmYXNoaW9ufGVufDB8fDB8fHww"
        alt="img2"
      />
      <img
        className="carousel-img"
        src="https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA3fHxmYXNoaW9ufGVufDB8fDB8fHww"
        alt="img3"
      />
    </div>
  );
});

const ImageRow3: React.FC = React.memo(() => {
  return (
    <div className="carousel-row">
      <img
        className="carousel-img"
        src="https://images.unsplash.com/photo-1520975867597-0af37a22e31e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzEwfHxmYXNoaW9ufGVufDB8fDB8fHww"
        alt="img1"
      />
      <img
        className="carousel-img"
        src="https://images.unsplash.com/photo-1573570049420-6b292236b86d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzIzfHxmYXNoaW9ufGVufDB8fDB8fHww"
        alt="img2"
      />
      <img
        className="carousel-img"
        src="https://images.unsplash.com/photo-1520367745676-56196632073f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzMwfHxmYXNoaW9ufGVufDB8fDB8fHww"
        alt="img3"
      />
    </div>
  );
});

export const CustomCarousel: React.FC = () => {
  return (
    <div>
      <Carousel autoplay>
        <ImageRow1 />
        <ImageRow2 />
        <ImageRow3 />
      </Carousel>
    </div>
  );
};
