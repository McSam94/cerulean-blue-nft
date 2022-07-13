import * as React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import throttle from 'lodash.throttle';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

interface ThumbGridProps {
  columnCount?: number;
  rowHeight?: number;
  data: Array<any>;
  isLoadingMore: boolean;
  loadMoreItems: (startIndex: number, stopIndex: number) => void;
  rowRender: ({ index, style }: { index: number; style: React.CSSProperties }) => React.ReactElement;
}

const ThumbGrid: React.FC<ThumbGridProps> = ({
  columnCount = 4,
  rowHeight = 260,
  data,
  isLoadingMore,
  loadMoreItems,
  rowRender,
}) => {
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <InfiniteLoader
            isItemLoaded={(index: number) => !!data[index]}
            itemCount={1000}
            loadMoreItems={isLoadingMore ? () => {} : throttle(loadMoreItems, 1500)}
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

              return (
                <Grid
                  ref={ref}
                  columnCount={columnCount}
                  columnWidth={width / columnCount}
                  onItemsRendered={newItemsRendered}
                  height={height}
                  width={width}
                  rowCount={Math.floor(data.length / columnCount)}
                  rowHeight={rowHeight}
                >
                  {({ columnIndex, rowIndex, style }) => {
                    const index = rowIndex * columnCount + columnIndex;
                    return rowRender({ index, style });
                  }}
                </Grid>
              );
            }}
          </InfiniteLoader>
        );
      }}
    </AutoSizer>
  );
};

export default ThumbGrid;
