import * as React from 'react';
import { Button, Divider, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useWallet } from '@contexts/wallet';

const WalletButton: React.FC = () => {
  const { connect, disconnect, truncateAccount, isConnected, balances, tokenInfos } = useWallet();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = React.useMemo(() => !!anchorEl, [anchorEl]);

  const onWalletClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const onMenuClose = React.useCallback(() => setAnchorEl(null), []);

  const onDisconnectClick = React.useCallback(() => {
    disconnect();
    onMenuClose();
  }, [disconnect, onMenuClose]);

  return (
    <>
      <Button id="wallet-button" disableElevation variant="contained" onClick={isConnected ? onWalletClick : connect}>
        {isConnected ? `${truncateAccount}` : 'Connect'}
      </Button>
      <Menu
        id="wallet-button"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={onMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem color="black" sx={{ fontWeight: 'bold', pointerEvents: 'none' }}>
          💰 Balance
        </MenuItem>
        {Array.from(balances).map(([address, balance]) => (
          <MenuItem key={address}>
            <Stack>
              <Typography variant="caption" color="GrayText">
                {tokenInfos.get(address)?.name.toUpperCase()}
              </Typography>
              <Typography variant="subtitle2">{balance}</Typography>
            </Stack>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={onDisconnectClick}>🔌 Disconnect</MenuItem>
      </Menu>
    </>
  );
};

export default WalletButton;
