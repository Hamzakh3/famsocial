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
const SubscribeModal = ({ open, closeHandler }) => {
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
              <IconButton>
                <CloseIcon />
              </IconButton>
            </div>
            <Divider />
            <FormGroup>
              {/* <label htmlFor="iptPhoneNumber"></label> */}
              <TextField
                id="iptPhoneNumber"
                label="Be a part of famsocial"
                placeholder="Enter Your Phone Number"
              />
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
              <Button onClick={closeHandler}>Close</Button>
              <Button color="primary" variant="contained">
                Subscribe
              </Button>
            </div>
          </Stack>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default SubscribeModal;
