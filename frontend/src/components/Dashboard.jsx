import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  TableContainer,
  TableBody,
  TableCell,
  tableCellClasses,
  Table,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ProfileTableRow from "./ui/ProfileTableRow";
import EditPopUp from "./Itinerary/EditModal";
import { useNavigate } from "react-router-dom";
import { TOKEN_TYPE, TokenService } from "@/lib/service/tokenService";

const Dashboard = () => {
  const [itineraryData, setItineraryData] = useState([
    {
      title: "Graduation Trip",
      budget: 10000,
      country: "Singapore",
      destinations: ["Merlion Park", "Singapore Zoo", "Gardens by the Bay"],
    },
    {
      title: "Year End Trip",
      budget: 20000,
      country: "Malaysia",
      destinations: ["Kuala Lumpur", "Penang", "Johor Bahru"],
    },
    {
      title: "Exchange Trip",
      budget: 5000,
      country: "China",
      destinations: ["Beijing", "Shanghai", "Guangzhou"],
    },
    {
      title: "Honeymoon Trip",
      budget: 8000,
      country: "Japan",
      destinations: ["Tokyo", "Osaka", "Kyoto"],
    },
  ]);
  const [isDeleteItinerary, setIsDeleteItinerary] = useState(false);

  const fetchItinerary = async () => {
    
    try {
      const response = await fetch(
        `http://localhost:5000/itinerary/retrieveAll/${TokenService.loadToken(TOKEN_TYPE.USER_ID)}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setItineraryData(data.itineraries);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchItinerary()
  })

  const handleDeleteItinerary = (itinerary_id) => {
    deleteItinerary(itinerary_id);
  };

  const deleteItinerary = async (itinerary_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/claimsite/claims/${itinerary_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      // fetchItinerary(user_id);
      console.log("Itinerary deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "darkslategray",
      fontSize: 16,
      color: theme.palette.common.white,
      fontFamily: "century gothic",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const styles = {
    paperContainer: {
      backgroundColor: "white",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      marginInline: "5%",
      marginBottom: "5%",
    },
  };

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        height: "100%",
        width: "100%",
        justifyContent: "space-evenly",
        paddingTop: "2%",
        paddingBottom: "5%",
        paddingInline: "5%",
      }}
    >
      <CssBaseline />
      <Box sx={{ display: "flex", justifyContent: "end", mb: 3, mx: 8 }}>
        <Button variant="contained">Log Out</Button>
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={5} style={styles.paperContainer}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                paddingInline: 5,
                paddingY: 2,
              }}
            >
              <Button variant="contained" sx={{ marginRight: 5 }}>
                Update Country Destinations
              </Button>
              <Fab color="primary" onClick= {()=> navigate("/createitinerary")}>
                <AddIcon />
              </Fab>
            </Box>
            <TableContainer
              sx={{ width: "auto", paddingInline: 5, paddingBottom: 5 }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell width="10%">
                      <b>ID</b>
                    </StyledTableCell>
                    <StyledTableCell width="20%">
                      <b>TITLE</b>
                    </StyledTableCell>
                    <StyledTableCell width="20%">
                      <b>BUDGET</b>
                    </StyledTableCell>
                    <StyledTableCell width="20%">
                      <b>COUNTRY</b>
                    </StyledTableCell>
                    <StyledTableCell width="20%">
                      <b>DESTINATIONS</b>
                    </StyledTableCell>
                    <StyledTableCell width="10%" align="center">
                      <b>CRUD</b>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itineraryData.map((data) => (
                    <StyledTableRow key={data.title}>
                      <StyledTableCell component="th" scope="row">
                        1
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {data.title}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {data.budget}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {data.country}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {data.destinations &&
                          data.destinations.map((destination) => (
                            <Typography
                              key={destination}
                              style={styles.typography}
                            >
                              {destination}
                            </Typography>
                          ))}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{ marginInline: 1 }}
                          >
                            View
                          </Button>
                          <EditPopUp itineraryId="1" destinationList={[]} />
                          <Button
                            variant="contained"
                            onClick={() => setIsDeleteItinerary(true)}
                            sx={{ marginInline: 1 }}
                          >
                            Delete
                          </Button>
                          <Dialog open={isDeleteItinerary}>
                            <DialogTitle>Delete Itinerary</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                Are you sure you want to delete this itinerary?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={() => {
                                  handleDeleteItinerary(itinerary_id);
                                  setIsDeleteItinerary(false);
                                }}
                              >
                                Yes
                              </Button>
                              <Button
                                onClick={() => setIsDeleteItinerary(false)}
                              >
                                No
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={5} style={styles.paperContainer}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 6,
              }}
            ></Box>
            <TableContainer
              sx={{ width: "auto", paddingInline: 5, paddingBottom: 5 }}
            >
              <Table>
                <TableBody>
                  <ProfileTableRow label="Name" item="Name" />
                  <ProfileTableRow label="Diagnosis" item="Diagnosis" />
                  <ProfileTableRow label="Package" item="Package" />
                  <ProfileTableRow
                    label="Treatment Stage"
                    item="Treatment Stage"
                  />
                  <ProfileTableRow
                    label="Number Of Treatments"
                    item="Number Of Treatments"
                  />
                  <ProfileTableRow
                    label="Remaining Treatments"
                    item="Remaining Treatments"
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper elevation={5} style={styles.paperContainer}>
            <TableContainer sx={{ width: "auto", padding: 5 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell colSpan={2}>
                      <b>Account Details</b>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <ProfileTableRow label="Username" item="Username" />
                  <ProfileTableRow label="Password" item="Password" />
                  <ProfileTableRow label="Phone Number" item="Phone Number" />
                  <ProfileTableRow label="Email" item="Email" />
                  <ProfileTableRow
                    label="Condition Type"
                    item="Condition Type"
                  />
                  <ProfileTableRow label="Source" item="Source" />
                  <ProfileTableRow label="Outlet" item="Outlet" />
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
