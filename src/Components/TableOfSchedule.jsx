import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import trains from './AllTrainDetail';
import { useState } from 'react';


export default function AccessibleTable(props) {
    const rows = props.data;

    console.log('rows', rows);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">SN</TableCell>
                        <TableCell align="right">Station Code</TableCell>
                        <TableCell align="right">Station Name</TableCell>
                        <TableCell align="right">Route Number</TableCell>
                        <TableCell align="right">Arrival Time</TableCell>
                        <TableCell align="right">Departure Time</TableCell>
                        <TableCell align="right">HaltTime</TableCell>
                        <TableCell align="right">Distance</TableCell>
                        <TableCell align="right">Day</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="right">{row.SN}</TableCell>
                            <TableCell align="right">{row.StationCode}</TableCell>
                            <TableCell align="right">{row.StationName}</TableCell>
                            <TableCell align="right">{row.RouteNumber}</TableCell>
                            <TableCell align="right">{row.ArrivalTime}</TableCell>
                            <TableCell align="right">{row.DepartureTime}</TableCell>
                            <TableCell align="right">{row.HaltTime}</TableCell>
                            <TableCell align="right">{row.Distance}</TableCell>
                            <TableCell align="right">{row.Day}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}