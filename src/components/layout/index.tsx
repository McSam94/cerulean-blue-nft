import * as React from 'react';
import { Stack } from '@mui/material';
import Header from './header';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Stack>
      <Header />
      {children}
    </Stack>
  );
};

export default Layout;
