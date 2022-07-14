import { useMediaQuery } from '@mui/material';

const useResponsive = () => {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 991px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  return { isDesktop, isTablet, isMobile };
};

export default useResponsive;
