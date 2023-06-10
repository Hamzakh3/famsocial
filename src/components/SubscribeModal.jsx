import {
  Divider,
  Grid,
  Modal,
  Stack,
  Button,
  TextField,
  FormGroup,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { auth, addContact } from "../config/firebase";
import { useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React from "react";

const SubscribeModal = ({ open, closeHandler }) => {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false)

  useEffect(() => {
    
  }, [message]);

  const createRecaptch = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "captcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  const subscribe = async () => {
    setBtnDisable(true)
    if (number.length > 11 && number.slice(0, 1) === "+") {
      createRecaptch();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, number, appVerifier)
      .then(async (res) => {
        window.confirmationResult = res;
        setCodeSent(true);
        setBtnDisable(false)
        })
        .catch((e) => {
          console.error(e.message);
        setBtnDisable(false)
      });
    } else {
      setMessage("Number is invalid");
      setBtnDisable(false)
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const codeConfirmation = () => {
    if (code.length === 6) {
      window.confirmationResult
        .confirm(code)
        .then(async (result) => {
          const user = result.user;
          await addContact(number, user.uid)
          setMessage("Subscribed Successfully")
          setTimeout(() => closeHandler(), 1000)
        }) //"vdczGGYmZzQI81M9Sb2Js5cMqW52"
        .catch((error) => {
          console.error(error.message);
          setMessage(error.message);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        });
    } else {
      setMessage("Code is invalid");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <Modal
      open={open}
      onClose={closeHandler}
      disableAutoFocus
      sx={{ border: "none" }}
    >
      <Grid
        sx={{
          textAlign: "center",
          maxWidth: "700px",
          minHeight: "100%",
          marginInline: "auto",
        }}
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <Grid
          item
          sx={{
            background: "white",
            width: "100%",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          <Stack rowGap="36px">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <h1>Welcome to Famsocial</h1>
              <IconButton onClick={closeHandler}>
                <CloseIcon />
              </IconButton>
            </div>
            <Divider />
            <FormGroup>
              {/* <label htmlFor="iptPhoneNumber"></label> */}
              <TextField
                id="iptPhoneNumber"
                label="Be a part of famsocial"
                placeholder="e.g. +923121234567"
                value={number}
                disabled={codeSent}
                onChange={(e) => setNumber(e.target.value)}
              />

              {codeSent && (
                <React.Fragment>
                  <p
                    style={{ marginBlock: "24px 8px", alignSelf: "flex-start" }}
                  >
                    Sent Verification code on your provided number
                  </p>
                  <TextField
                    id="iptCode"
                    label="Enter Verification Code"
                    placeholder="Enter 6 digits code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </React.Fragment>
              )}
            </FormGroup>
            <Divider />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "16px",
              }}
            >
              <p>{message}</p>
              <Button onClick={closeHandler}>Close</Button>
              <Button
                color="primary"
                variant="contained"
                disabled={ btnDisable }
                onClick={codeSent ? codeConfirmation : subscribe}
              >
                {codeSent ? "Verify" : "Subscribe"}
              </Button>
            </div>
            <div id="captcha-container"></div>
          </Stack>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default SubscribeModal;
