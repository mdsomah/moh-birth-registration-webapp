import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

const color = "#0047AB";

const Loader = () => {
  return (
    <React.Fragment>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <PulseLoader
          color={color}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </React.Fragment>
  );
};

export default Loader;
