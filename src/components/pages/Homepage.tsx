import { CustomCarousel } from "../utilities/CustomCarousel";
import { HomepageDescription } from "../utilities/HomepageDescription";

export const Homepage: React.FC = () => {
  return (
    <>
      <div>
        <CustomCarousel />
        <div style={{ marginTop: 50, textAlign: "left" }}>
          <HomepageDescription />
        </div>
      </div>
    </>
  );
};
