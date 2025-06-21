import React, { useRef } from "react";
import Popup from "reactjs-popup";
import SignatureCanvas from "react-signature-canvas";
import { Box, Button } from "@mui/material";
import "reactjs-popup/dist/index.css";

const ApplicantSignature = (props) => {
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
              canvasProps={{ width: 500, height: 300, className: "sigCanvas" }}
              ref={sigCanvas}
            />
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
          </>
        )}
      </Popup>
    </Box>
  );
};

export default ApplicantSignature;
