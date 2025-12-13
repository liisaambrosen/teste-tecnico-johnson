import { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert, Typography, Container } from '@mui/material';
import api from './service/api';
import type { FormattedPeople, People } from './types';
import type { Filters } from './types';
import Header from './components/Header';
import PeopleList from './components/PeopleList';
import PeopleTable from './components/PeopleTable';
import PeopleTree from './components/PeopleTree';
import FiltersBar from './components/FiltersBar';

type ViewMode = 'list' | 'table' | 'tree';

export default function App() {
  const [people, setPeople] = useState<People[]>([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    setLoad(true);
    setError(null);
    api.get<People[]>('/people')
      .then(response => {
        const data = response.data ?? [];
        setPeople(data);
      })
      .catch(error => setError(error?.message ?? 'Error fetching people data.'))
      .finally(() => setLoad(false));
  }, []);

  
  const departments = Array.from(new Set(people.map(p => p.department).filter(Boolean)));

  const managerIdSet = new Set<number>(
    people.map(person => person.managerId).filter((id): id is number => id != null)
  );

  const formattedPeople: FormattedPeople[] = people.map(person => ({
    ...person,
    managerName: people.find(p => p.id === person.managerId)?.name || null,
    managedPeople: people.filter(p => p.managerId === person.id).map(p => p.name) || [],
  }));

  const managers = people
    .filter(person => managerIdSet.has(person.id))
    .map(person => ({ id: String(person.id), name: person.name }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const filteredPeople = formattedPeople.filter(p => {
    if (filters.department && p.department !== filters.department) return false;
    if (filters.managerId !== undefined) {
      if (filters.managerId === null) {
        if (p.managerId !== null) return false;
      } else {
        if (String(p.managerId) !== filters.managerId) return false;
      }
    }
    if (filters.type && p.type !== filters.type) return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Header 
          view={view} 
          onViewChange={setView}
        />
        <FiltersBar
          departments={departments}
          managers={managers}
          filters={filters}
          onChange={setFilters}
        />
        {load && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {!load && !error && view === 'list' && <PeopleList people={filteredPeople} />}
        {!load && !error && view === 'table' && <PeopleTable people={filteredPeople} />}
        {!load && !error && view === 'tree' && (
          <PeopleTree allPeople={people} filteredPeople={filteredPeople}
          />
        )}
        {!load && !error && filteredPeople.length === 0 && (
          <Typography color="text.secondary">No people found.</Typography>
        )}
      </Container>
    </Box>
  );
}