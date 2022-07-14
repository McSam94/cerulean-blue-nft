import * as React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import throttle from 'lodash.throttle';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { Skeleton, Stack } from '@mui/material';

interface ThumbGridProps {
  header?: ({ style }: { style: React.CSSProperties }) => React.ReactElement;
  columnCount?: number;
  rowHeight?: number;
  data: Array<any>;
  height?: number;
  width?: number;
  isLoadingMore: boolean;
  hasMore?: boolean;
  loadMoreItems: (startIndex: number, stopIndex: number) => void;
  gridRenderer: ({ index, style }: { index: number; style: React.CSSProperties }) => React.ReactElement | null;
}

const ThumbGrid: React.FC<ThumbGridProps> = ({
  columnCount = 4,
  rowHeight = 260,
  data,
  height,
  width,
  isLoadingMore,
  hasMore = true,
  header,
  loadMoreItems,
  gridRenderer,
}) => {
  return (
    <AutoSizer>
      {({ height: autoSizerHeight, width: autoSizerWidth }) => {
        return (
          <InfiniteLoader
            isItemLoaded={(index: number) => {
              const indexWithoutHeader = header ? Math.max(index - columnCount, 0) : index;
              console.log(indexWithoutHeader < data.length);
              return indexWithoutHeader < data.length;
            }}
            itemCount={data.length * 10}
            loadMoreItems={!isLoadingMore && hasMore ? throttle(loadMoreItems, 1500) : () => {}}
          >
            {({ onItemsRendered, ref }) => {
              const newItemsRendered = (gridData: any) => {
                const useOverscanForLoading = true;
                const {
                  visibleRowStartIndex,
                  visibleRowStopIndex,
                  visibleColumnStopIndex,
                  overscanRowStartIndex,
                  overscanRowStopIndex,
                  overscanColumnStopIndex,
                } = gridData;

                const endCol = (useOverscanForLoading || true ? overscanColumnStopIndex : visibleColumnStopIndex) + 1;

                const startRow = useOverscanForLoading || true ? overscanRowStartIndex : visibleRowStartIndex;
                const endRow = useOverscanForLoading || true ? overscanRowStopIndex : visibleRowStopIndex;

                const visibleStartIndex = startRow * endCol;
                const visibleStopIndex = endRow * endCol;

                onItemsRendered({
                  overscanStartIndex: overscanRowStartIndex,
                  overscanStopIndex: overscanRowStopIndex,
                  visibleStartIndex,
                  visibleStopIndex,
                });
              };

              const columnWidth = width ?? autoSizerWidth / columnCount;
              const rowItems = Math.ceil(data.length / columnCount);
              const rowItemsWithFooterAndHeader = rowItems + (header ? 1 : 0) + (isLoadingMore ? 1 : 0);

              return (
                <>
                  <Grid
                    ref={ref}
                    columnCount={columnCount}
                    columnWidth={columnWidth}
                    onItemsRendered={newItemsRendered}
                    height={height ?? autoSizerHeight}
                    width={width ?? autoSizerWidth}
                    rowCount={rowItemsWithFooterAndHeader}
                    rowHeight={rowHeight}
                  >
                    {({ columnIndex, rowIndex, style }) => {
                      const index = rowIndex * columnCount + columnIndex;
                      const indexWithHeader = columnCount > index ? index - columnCount : index;

                      // use first row to render header
                      if (header && rowIndex === 0) {
                        if (columnIndex === 0) return header({ style: { ...style, width: '100%' } });

                        return null;
                      }

                      if (rowIndex === rowItems && isLoadingMore) {
                        return (
                          <Stack padding={4} style={style}>
                            <Skeleton variant="rectangular" width="100%" height="100%" />
                          </Stack>
                        );
                      }

                      return (
                        <Stack padding={4} style={style}>
                          {gridRenderer({ index: header ? indexWithHeader : index, style })}
                        </Stack>
                      );
                    }}
                  </Grid>
                </>
              );
            }}
          </InfiniteLoader>
        );
      }}
    </AutoSizer>
  );
};

export default React.memo(ThumbGrid);
