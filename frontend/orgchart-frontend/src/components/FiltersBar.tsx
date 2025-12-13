import { Box, FormControl, InputLabel, Select, MenuItem, Stack, Button, TextField } from '@mui/material';
import { useState } from 'react';
import type { Filters } from '../types';

interface ManagerOption { id: string; name: string }
interface Props {
  departments: string[];
  managers: ManagerOption[];
  filters: Filters;
  onChange: (f: Filters) => void;
}

export default function FiltersBar({ departments, managers, filters, onChange }: Props) {
  const [searchInput, setSearchInput] = useState<string>(filters.search ?? '');
  
  const setField = <K extends keyof Filters>(key: K, value?: Filters[K]) => {
    const next = { ...filters };
    if (value === '' || value === undefined) {
      delete next[key];
    } else {
      next[key] = value;
    }
    onChange(next);
  };

  const clearAll = () => onChange({});
  const applySearch = () => setField('search', searchInput.trim() || '');

  return (
    <Box sx={{ mb: 2, p: 1.5, borderRadius: 2, boxShadow: 1 }}>
      {/* Row 1: Select filters */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        alignItems="center"
        justifyContent="center"
        sx={{ flexWrap: 'wrap', rowGap: 1.5, columnGap: 1.5 }}
      >
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={filters.department ?? ''}
            label="Department"
            onChange={(e) => setField('department', e.target.value || '')}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            {departments.map((d) => (
              <MenuItem key={d} value={d}>{d}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Manager</InputLabel>
          <Select
            value={filters.managerId === undefined ? '' : (filters.managerId === null ? 'NULL' : String(filters.managerId))}
            label="Manager"
            onChange={(e) => {
              const v = e.target.value;
              if (v === '') setField('managerId', '');
              else if (v === 'NULL') setField('managerId', null);
              else setField('managerId', v);
            }}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="NULL">Top-level (no manager)</MenuItem>
            {managers.map((m) => (
              <MenuItem key={m.id} value={m.id}>{m.name} ({m.id})</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filters.type ?? ''}
            label="Type"
            onChange={(e) => setField('type', e.target.value || '')}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Partner">Partner</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status ?? ''}
            label="Status"
            onChange={(e) => setField('status', e.target.value || '')}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" size="small" onClick={clearAll}>Clear Filters</Button>
      </Stack>

      {/* Row 2: Search input + button */}
      <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ mt: 1.5 }}>
        <TextField
          label="Search by name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') applySearch();
          }}
          sx={{ minWidth: 240 }}
        />
        <Button variant="contained" size="small" onClick={applySearch}>Search</Button>
      </Stack>
    </Box>
  );
}