import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const formatDate = dateString => {
  const date = new Date(dateString);
  const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
};
export default function VehicleMaintanceTable({ issues }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Priority</TableCell>

            <TableCell align="right">Due date</TableCell>

            <TableCell align="right">Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map(issue => (
            <TableRow key={issue.id}>
              <TableCell>{issue.description}</TableCell>
              <TableCell align="right">{issue.priority}</TableCell>
              <TableCell align="right">{formatDate(issue.due_date)}</TableCell>
              <TableCell align="right">
                {' '}
                <Checkbox checked={issue.comleted} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
