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
import { grey } from "@mui/material/colors";

const ViewPopUp = ({ itineraryData }) => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const rows = itineraryData.destinations;
  return (
    <div>
      <Button onClick={handleOpen}>View</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h4" component="h3" align="center">
            Itinerary Details
          </Typography>
          <br />
          <div align="center">
            <TextField
              required
              label="Itinerary Name"
              id="filled-required"
              value={itineraryData.title  } // link data
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
              value={itineraryData.budget} // link data
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
              value={itineraryData.country} // link data
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
                    <TableCell>LIST OF DESTINATIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                  <TableRow
                    key={row}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row}
                    </TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ViewPopUp;
