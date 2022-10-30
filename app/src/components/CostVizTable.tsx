import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface HeadCell {
  id: string;
  label: string;
}

interface RowData {
  id: string;
  cellData: unknown[];
}

interface CovizTableProps {
  headCells: HeadCell[];
  rowData: RowData[];
  setSelectedRow: (value: string) => void;
}

const CovizTable = ({ headCells, rowData, setSelectedRow }: CovizTableProps) => {
  const onClickSelectedRow = async (e: any) => {
    const metricTable = e.target.innerText;
    setSelectedRow(metricTable);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="coviz table" stickyHeader>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <StyledTableCell key={headCell.label}>{headCell.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {row.cellData.map((cell) => (
                <StyledTableCell key={cell as string} component="th" scope="row" onClick={onClickSelectedRow}>
                  {cell}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CovizTable;
