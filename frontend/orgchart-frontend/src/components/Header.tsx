import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ViewList, TableChart, AccountTree } from '@mui/icons-material';

type ViewMode = 'list' | 'table' | 'tree';

interface Props { 
  view: ViewMode; 
  onViewChange: (v: ViewMode) => void;
}

export default function Header({ view, onViewChange }: Props) {
  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: ViewMode) => {
      onViewChange(newView);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          bgcolor: '#EB1700',
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h5" sx={{ color: '#FFFFFF', m: 0 }}>
          Johnson&Johnson - Org Chart People
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
          size="small"
        >
          <ToggleButton value="list" aria-label="list view">
            <ViewList sx={{ mr: 0.5 }} /> List
          </ToggleButton>
          <ToggleButton value="table" aria-label="table view">
            <TableChart sx={{ mr: 0.5 }} /> Table
          </ToggleButton>
          <ToggleButton value="tree" aria-label="tree view">
            <AccountTree sx={{ mr: 0.5 }} /> Tree
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  );
}