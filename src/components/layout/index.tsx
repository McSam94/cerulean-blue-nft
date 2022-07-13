import * as React from 'react';
import { Stack } from '@mui/material';
import Header from './header';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Stack width="100vw" height="100vh">
      <Header />
      {children}
    </Stack>
  );
};

export default Layout;
