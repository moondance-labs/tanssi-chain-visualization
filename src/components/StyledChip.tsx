import { Chip } from '@mui/material';

export const StyledChip = ({ label, href }: { label: string; href: string }) => (
  <Chip label={label} component="a" href={href} target="_blank" clickable variant="outlined" />
);
