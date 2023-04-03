import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
///importing Style
import { BillingManagementStyles } from './BillingManagementStyles';
import { Box } from '@mui/system';
import { Divider, Typography } from '@mui/material';

function createData(Project, Incurred, DifferenceFromScheduled, FutureScheduled, Total) {
    return { Project, Incurred, DifferenceFromScheduled, FutureScheduled, Total };
}

const rows = [
    createData('Sample: Confirmed project', 0.00, 0.00, 24.0, 24.0),
    createData('Sample: Internal Operations Project', 0.00, 0.00, 24.0, 24.0),
    createData('Total', 0.00, 0.00, 24.0, 24.0),
];

export default function BasicTable() {
    return (

        <Box>
            <Typography variant='h5' align='center'>Billing Management</Typography>
            <Divider sx={{ backgroundColor: 'black', mt: 2 }} />
            <TableContainer component={Paper} sx={{ width: '70rem', m: 'auto', mt: 33, border: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Project</TableCell>
                            <TableCell align="center">Incurred</TableCell>
                            <TableCell align="center">Difference From Scheduled</TableCell>
                            <TableCell align="center">FutureScheduled</TableCell>
                            <TableCell align="center">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.Project}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='left'> {row.Project}</TableCell>
                                <TableCell align="center">{row.Incurred}</TableCell>
                                <TableCell align="center">{row.DifferenceFromScheduled}</TableCell>
                                <TableCell align="center">{row.FutureScheduled}</TableCell>
                                <TableCell align="center">{row.Total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}