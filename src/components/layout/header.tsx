import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import WalletButton from '@components/wallet';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ padding: '1.2rem 2.4rem', backgroundColor: 'black' }}
    >
      <Stack direction="row" spacing={2}>
        <Link href="/" passHref>
          <a>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              Cerulean Blue NFT
            </Typography>
          </a>
        </Link>
      </Stack>
      <WalletButton />
    </Stack>
  );
};

export default Header;
