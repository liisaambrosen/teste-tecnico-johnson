import { Card, CardContent, Avatar, Typography, Chip, Grid, Stack, Pagination } from '@mui/material';
import type { FormattedPeople } from '../types';
import { useState } from 'react';
import avatarImage from '../assets/random-background.png';

interface Props { people: FormattedPeople[] }

export default function PeopleList({ people }: Props) {
  const [openPersonId, setOpenPersonId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const pageSize = 9;
  const pageCount = Math.max(1, Math.ceil(people.length / pageSize));
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const visiblePeople = people.slice(start, end);

  return (
      <Stack spacing={2}>
      <Grid container spacing={2}>
        {visiblePeople.map(person => (
          <Grid size={{xs:12, sm:6, md:4}} key={person.id}>
          <Card 
            variant="outlined"
            onClick={() => setOpenPersonId(openPersonId === person.id ? null : person.id)}
            sx={{
              cursor: 'pointer',
              transition: 'transform 120ms ease, box-shadow 120ms ease',
              '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
            }}
          >
            <CardContent>
            <Stack spacing={2} alignItems="center" textAlign="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={avatarImage}
                alt={person.name}
                sx={{ mb: 1 }}
              />
              <Stack spacing={0.5}>
              <Typography gutterBottom variant="h6">
                {person.name}
              </Typography>
              <Typography color="text.secondary">
                {person.jobTitle}
              </Typography>
              <Typography variant="body2">{person.department}</Typography>
              </Stack>
            </Stack>
              <Stack direction="row" spacing={1}>
                <Chip label={person.type}/>
                <Chip label={person.status}/>
              </Stack>
              <Typography variant="caption">{person.workEmail}</Typography>
              <Typography variant="caption">{person.hireDate?.toString()}</Typography>
              <Typography variant="caption">{person.location}</Typography>
              {openPersonId === person.id && (
                <>
                  <Typography variant="body2">Manager: {person.managerName} </Typography>
                  <Typography variant="body2">Managed people: {person.managedPeople.join(', ')}</Typography>
                </>
              )}
              </Stack>
            </CardContent>
          </Card>
          </Grid>
        ))}
      </Grid>
      <Stack alignItems="center">
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          sx={{ mt: 1, '& .Mui-selected': { backgroundColor: '#EB1700', color: '#FFFFFF', '&:hover': { backgroundColor: '#adacacff' } } }}
        />
      </Stack>
      </Stack>
  );
}