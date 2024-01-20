import { TableCell, tableCellClasses, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

function ProfileTableRow({ label, item }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      color: theme.palette.common.black,
      fontFamily: "Century Gothic",
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

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        {label}
      </StyledTableCell>
      <StyledTableCell align="left">{item}</StyledTableCell>
    </StyledTableRow>
  );
}

export default ProfileTableRow;
