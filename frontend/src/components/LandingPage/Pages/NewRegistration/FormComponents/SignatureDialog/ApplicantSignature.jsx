import React, { useRef } from "react";
import Popup from "reactjs-popup";
import SignatureCanvas from "react-signature-canvas";
import { Box, Button } from "@mui/material";
import "reactjs-popup/dist/index.css";

//? Signature Canvas CSS
import "./sigCanvas.css";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

const ApplicantSignature = (props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //? Destructure props
  const { formik } = props;

  //? SigCanvas
  const sigCanvas = useRef({});

  //? Load
  const load = (savedData) => {
    sigCanvas.current.fromData(savedData);
    console.log(savedData);
  };

  //? Save
  const save = () => {
    formik.setFieldValue(
      "applicantSignature",
      sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
    );
  };

  //? Clear
  const clear = () => sigCanvas.current.clear();

  return (
    <Box>
      <Popup
        modal
        trigger={<Button sx={{ color: "#4169E1" }}>Open Signature Pad</Button>}
        closeOnDocumentClick={false}
        position="right center"
      >
        {(close) => (
          <>
            <SignatureCanvas
              penColor="#4169E1"
              canvasProps={{ className: "sigCanvas" }}
              ref={sigCanvas}
              redrawOnResize={true}
            />
            {isDesktopOrLaptop && (
              <Box sx={{ display: "flex", mb: 2, ml: 2 }} gap={2}>
                <Button
                  variant="contained"
                  onClick={() => load(formik.values.applicantSignature)}
                >
                  Load
                </Button>
                <Button variant="contained" onClick={() => save()}>
                  Save
                </Button>
                <Button variant="contained" onClick={() => clear()}>
                  Clear
                </Button>
                <Button variant="contained" onClick={() => close()}>
                  Close
                </Button>
              </Box>
            )}
            {isBigScreen && (
              <Box sx={{ display: "flex", mb: 2, ml: 2 }} gap={2}>
                <Button
                  variant="contained"
                  onClick={() => load(formik.values.applicantSignature)}
                >
                  Load
                </Button>
                <Button variant="contained" onClick={() => save()}>
                  Save
                </Button>
                <Button variant="contained" onClick={() => clear()}>
                  Clear
                </Button>
                <Button variant="contained" onClick={() => close()}>
                  Close
                </Button>
              </Box>
            )}
            {isTabletOrMobile && (
              <Box sx={{ display: "block", mb: 2, ml: 2 }} gap={2}>
                <Button
                  variant="contained"
                  onClick={() => load(formik.values.applicantSignature)}
                  sx={{ mr: 1, mb: 1 }}
                >
                  Load
                </Button>
                <Button
                  variant="contained"
                  onClick={() => save()}
                  sx={{ mb: 1 }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={() => clear()}
                  sx={{ mr: 1 }}
                >
                  Clear
                </Button>
                <Button variant="contained" onClick={() => close()}>
                  Close
                </Button>
              </Box>
            )}
          </>
        )}
      </Popup>
    </Box>
  );
};

export default ApplicantSignature;
