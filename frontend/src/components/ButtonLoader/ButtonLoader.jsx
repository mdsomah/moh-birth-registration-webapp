import React from "react";
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

const color = "#fff";

const ButtonLoader = () => {
  return (
    <React.Fragment>
      <div
        style={{
          textAlign: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <ClipLoader
          color={color}
          cssOverride={override}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </React.Fragment>
  );
};

export default ButtonLoader;
