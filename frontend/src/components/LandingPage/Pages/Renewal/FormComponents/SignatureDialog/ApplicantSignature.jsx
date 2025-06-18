import React, { useRef } from "react";
import Popup from "reactjs-popup";
import SignatureCanvas from "react-signature-canvas";
import { Box, Button } from "@mui/material";
import "reactjs-popup/dist/index.css";

const ApplicantSignature = (props) => {
  // Destructure props
  const { formik } = props;

  // SigCanvas
  const sigCanvas = useRef({});

  // Save
  const save = () =>
    formik.setFieldValue(
      "applicantSignature",
      sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
    );

  // Clear
  const clear = () => sigCanvas.current.clear();

  return (
    <Box>
      <Popup
        modal
        trigger={<Button sx={{ color: "#DC143C" }}>Open Signature Pad</Button>}
        closeOnDocumentClick={false}
        position="right center"
      >
        {(close) => (
          <>
            <SignatureCanvas
              penColor="blue"
              canvasProps={{ width: 500, height: 400, className: "sigCanvas" }}
              ref={sigCanvas}
            />
            <button onClick={() => save()}>Save</button>
            <button onClick={() => clear()}>Clear</button>
            <button onClick={() => close()}>Close</button>
          </>
        )}
      </Popup>
    </Box>
  );
};

export default ApplicantSignature;
