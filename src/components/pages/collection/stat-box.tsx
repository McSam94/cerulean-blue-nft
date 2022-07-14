import { Icon, Stack, Typography } from '@mui/material';
import * as React from 'react';

interface StatBoxProps {
  icon?: string;
  stat: number;
  label: string;
}

const StatBox: React.FC<StatBoxProps> = ({ icon, stat, label }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width={120}
      height={140}
      borderRadius={2}
      spacing={1}
      boxShadow="0px 4px 12px 2px #0000000D"
      sx={{
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 'none',
        },
      }}
    >
      {icon ? <Icon style={{ fontSize: 50 }}>{icon}</Icon> : null}
      <Typography variant="subtitle1" fontWeight={500} color="GrayText" textAlign="center">
        {`${stat} ${label}`}
      </Typography>
    </Stack>
  );
};

export default StatBox;
