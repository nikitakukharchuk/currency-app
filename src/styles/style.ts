import styled from "../../node_modules/@emotion/styled/base/dist/emotion-styled-base.cjs";
import { TableCell, TableRow } from "../../node_modules/@mui/material/index";
import tableCellClasses from "../../node_modules/@mui/material/TableCell/tableCellClasses";


export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'black',
      color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  export const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#f5f5f5',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));