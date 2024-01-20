import {
  Modal,
  Button,
  Box,
  TextField,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import * as React from "react";

const ViewPopUp = ({ itineraryData }) => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: "auto",
    boxShadow: 24,
  };

  // todo: link api call here?

  // const destination_detail = [
  //   {
  //     field: "itinerary_id"
  //   }
  // ]

  return (
    <div>
      <Button onClick={handleOpen}>View</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {/* <Box sx={boxStyle}> */}
          <Typography variant="h4" component="h3" align="center">
            Itinerary Details
          </Typography>
          <br />
          <div align="center">
            <TextField
              required
              label="Itinerary Name"
              id="filled-required"
              // value={itinerary_detail.itineraryTitle} // link data
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <br />
          <div align="center">
            <TextField
              required
              label="Budget ($)"
              id="filled-required"
              // value={itinerary_detail.budget} // link data
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <br />
          <div align="center">
            <TextField
              required
              label="Country"
              id="filled-required"
              // value={itinerary_detail.country} // link data
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div align="center">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>List of Destinations</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {rows.map((row) => ( */}
                  <TableRow
                    // key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {/* {row.name} */}
                      destination 1
                    </TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
        {/* </Box> */}
      </Dialog>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions>
    </div>
  );
};
export default ViewPopUp;
