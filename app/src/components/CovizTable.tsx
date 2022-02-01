import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import { getCloudWatchMetricData } from './../sdk/cloudWatchMetrics';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

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


interface TableProps {
    awsProfileName: string;
    headCells: HeadCell[];
    rowData: RowData[];
}

const CovizTable = ({ headCells, rowData, awsProfileName }: TableProps) => {

    const displayDetails = async (e: any) => {
        console.log(e.target.innerText);
        const metricTable = e.target.innerText
        const cloudWatchMetricData = await getCloudWatchMetricData(metricTable, awsProfileName);
        console.log("cloudWatchMetricData", cloudWatchMetricData);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
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
                                <TableRow
                                    key={row.id}
                                    hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {row.cellData.map((cell) => (
                                        <StyledTableCell key={cell as string} component="th" scope="row" onClick={displayDetails}>
                                            {cell}
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table >
                </TableContainer >
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ minWidth: 400 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                            be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>


        </Grid>
    );
}

export default CovizTable
