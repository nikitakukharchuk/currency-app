import React from "react";
import { TableContainer, Table, TableHead, TableBody } from "../../../node_modules/@mui/material/index";
import { StyledTableRow, StyledTableCell } from "../../styles/style";
import { CurrencyTableType } from "../../types/CurrencyTableType";

export const CurrencyTable = ({rates, getMostProfitable }: CurrencyTableType) => {
    return (
        <TableContainer sx={{display: 'flex', justifyContent: 'center'}}>
        <Table sx={{ width: 700 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Pair name/market</StyledTableCell>
              <StyledTableCell align="center">First</StyledTableCell>
              <StyledTableCell align="center">Second</StyledTableCell>
              <StyledTableCell align="center">Third</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rates.map((item:{}, index:number) => {
              return (
                <StyledTableRow align="center" key={index}>
                  <StyledTableCell align="center">
                    {Object.keys(item)[0]}
                  </StyledTableCell>
                  {Object.values(item).map((itemNew: number[]) =>
                    itemNew.map((itemNum: number, indexNum: number) => (
                      <StyledTableCell
                        align="center"
                        sx={{ backgroundColor: itemNum === getMostProfitable() ? "#b1b1b1" : "" }}
                        key={indexNum}
                      >
                        {itemNum.toFixed(1)}
                      </StyledTableCell>
                    ))
                  )}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>     
    )
}