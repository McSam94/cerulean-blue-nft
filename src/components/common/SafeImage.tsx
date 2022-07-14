import { Skeleton } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import * as React from 'react';

interface SafeImageProps {
  isSrcLoading?: boolean;
  defaultSrc?: string;
  src?: ImageProps['src'];
}

type ImagePropsWithoutSrc = Omit<ImageProps, 'src'>;

const SafeImage: React.FC<SafeImageProps & ImagePropsWithoutSrc> = ({
  isSrcLoading = false,
  defaultSrc,
  alt,
  src,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  if (isError || (!src && !isSrcLoading)) {
    return <Image src={defaultSrc ?? '/placeholder/collection-default.png'} alt="placeholder" {...props} />;
  }

  return (
    <>
      {!isSrcLoading && src ? (
        <Image
          src={src}
          onError={() => setIsError(true)}
          onLoadingComplete={() => setIsLoading(false)}
          alt={alt}
          {...props}
        />
      ) : null}
      {isLoading || isSrcLoading ? <Skeleton variant="rectangular" height="100%" width="100%" /> : null}
    </>
  );
};

export default React.memo(SafeImage);
