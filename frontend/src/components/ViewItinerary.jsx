

import { Modal, Button, Box, TextField, Typography, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from '@mui/material';
import Paper from "@mui/material/Paper";
import * as React from 'react';

export default function ViewItinerary() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width: 'auto',
    boxShadow: 24,
  };

  // todo: link api call here?
  // const itinerary_detail = [
  //   {
  //     field: "itinerary_id"
  //   }
  // ]

  // const destination_detail = [
  //   {
  //     field: "itinerary_id"
  //   }
  // ]

  return (
    <div>
      <Button onClick={handleOpen}>View</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={boxStyle}>
          <Typography variant="h4" component="h3" align='center'>Itinerary Details</Typography>
          <br/>
          <div align='center'>
            <TextField
              required
              label = "Itinerary Name"
              id="filled-required"
              //value={itinerary_detail.name} // link data
              value = "name"
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <br/>
          <div align='center'>
            <TextField
              required
              label = "Budget ($)"
              id="filled-required"
              value="budget" 
              // value={itinerary_detail.budget} // link data
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <br/>
          <div align='center'>
            <TextField
              required
              label = "Country"
              id="filled-required"
              value = "country"
              //value={itinerary_detail.country} // link data
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align='center' size='medium'>List of Destinations</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {rows.map((row) => ( */}
                  <TableRow
                    // key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
        </Box>
      </Modal>
    </div>

  );

}