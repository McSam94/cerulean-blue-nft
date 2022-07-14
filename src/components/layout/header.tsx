import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import WalletButton from '@components/wallet';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useResponsive from '@hooks/useResponsive';

const Header: React.FC = () => {
  const { route } = useRouter();
  const { isMobile } = useResponsive();

  const isCollectionDetailPage = React.useMemo(() => /^\/collection/.test(route), [route]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      zIndex="100"
      paddingY={4}
      paddingX={5}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, .9)',
        ...(isCollectionDetailPage ? { position: 'fixed' } : {}),
      }}
    >
      <Stack direction="row" spacing={2}>
        <Link href="/" passHref>
          <a>
            <Typography variant="h5" color="primary.dark" sx={{ fontWeight: 'bold' }}>
              {isMobile ? `CB NFT` : 'Cerulean Blue NFT'}
            </Typography>
          </a>
        </Link>
      </Stack>
      <WalletButton />
    </Stack>
  );
};

export default Header;
