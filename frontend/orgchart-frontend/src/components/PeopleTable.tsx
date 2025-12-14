import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useState } from 'react';
import type { People } from '../types';

interface Props { people: People[] }

export default function PeopleTable({ people }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Hire Date</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((person) => (
                <TableRow key={person.id} hover>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.jobTitle}</TableCell>
                  <TableCell>{person.department}</TableCell>
                  <TableCell>{person.type}</TableCell>
                  <TableCell>{person.status}</TableCell>
                  <TableCell>{person.workEmail}</TableCell>
                  <TableCell>{person.hireDate ? person.hireDate.toString() : ''}</TableCell>
                  <TableCell>{person.location}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={people.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}