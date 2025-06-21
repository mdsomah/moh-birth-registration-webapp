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
              canvasProps={{ width: 500, height: 400, className: "sigCanvas" }}
              ref={sigCanvas}
            />
            <Button onClick={() => load(formik.values.applicantSignature)}>
              Load
            </Button>
            <Button onClick={() => save()}>Save</Button>
            <Button onClick={() => clear()}>Clear</Button>
            <Button onClick={() => close()}>Close</Button>
          </>
        )}
      </Popup>
    </Box>
  );
};

export default ApplicantSignature;
