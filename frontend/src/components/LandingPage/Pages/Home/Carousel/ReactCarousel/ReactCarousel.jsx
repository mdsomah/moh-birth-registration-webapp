import React from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

//? Import React Carousel CSS
import "react-responsive-carousel/lib/styles/carousel.min.css";

//? Carousel Images Import
import Image1 from "../../../../../../images/Carousel-Images/Image-1.jpeg";
import Image2 from "../../../../../../images/Carousel-Images/Image-2.jpg";
import Image3 from "../../../../../../images/Carousel-Images/Image-3.jpg";

const ReactCarousel = () => {
  return (
    <React.Fragment>
      <Carousel>
        <Box>
          <img src={Image1} alt="MOH Logo" width="100" />
          <p className="legend">Legend 1</p>
        </Box>
        <Box>
          <img src={Image2} alt="MOH Logo" width="100" />
          <p className="legend">Legend 2</p>
        </Box>
        <Box>
          <img src={Image3} alt="MOH Logo" width="100" />
          <p className="legend">Legend 3</p>
        </Box>
      </Carousel>
    </React.Fragment>
  );
};

export default ReactCarousel;
