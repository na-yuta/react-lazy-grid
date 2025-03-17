import React, { useState, useEffect, useRef } from "react";

interface LazyGridProps {
  grid: any[][] | any[];
  Component: React.FC<any>;
  width: string;
  height: string;
  itemWidth: number;
  itemHeight: number;
  buffer?: number;
  transpose?: boolean;
}

const LazyGrid: React.FC<LazyGridProps> = ({ grid, Component, width, height, itemWidth, itemHeight, buffer = 0, transpose = false }) => {
  const [scrollPosition, setScrollPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollPosition({
          top: containerRef.current.scrollTop,
          left: containerRef.current.scrollLeft,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const isTwoDimensional = Array.isArray(grid[0]);

  const transformedGrid = isTwoDimensional
    ? (transpose ? grid[0].map((_, colIndex) => grid.map(row => row[colIndex])) : grid)
    : (transpose ? [grid] : grid.map(item => [item]));

  const rowCount = transformedGrid.length;
  const colCount = transformedGrid[0].length;

  const relativeWidth = colCount * itemWidth;
  const relativeHeight = rowCount * itemHeight;

  const visibleRowStart = Math.max(0, Math.floor(scrollPosition.top / itemHeight) - buffer);
  const visibleRowEnd = Math.min(
    rowCount,
    Math.ceil((scrollPosition.top + parseInt(height)) / itemHeight) + buffer
  );
  const visibleColStart = Math.max(0, Math.floor(scrollPosition.left / itemWidth) - buffer);
  const visibleColEnd = Math.min(
    colCount,
    Math.ceil((scrollPosition.left + parseInt(width)) / itemWidth) + buffer
  );

  return (
    <div ref={containerRef} style={{ width, height, overflow: "scroll" }}>
      <div style={{ position: "relative", width: relativeWidth, height: relativeHeight }}>
        {transformedGrid.slice(visibleRowStart, visibleRowEnd).map((row, rowIndex) =>
          row.slice(visibleColStart, visibleColEnd).map((props, colIndex) => (
            <div
              key={`${visibleRowStart + rowIndex}-${visibleColStart + colIndex}`}
              style={{
                position: "absolute",
                top: `${(visibleRowStart + rowIndex) * itemHeight}px`,
                left: `${(visibleColStart + colIndex) * itemWidth}px`,
              }}
            >
              <Component {...props} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LazyGrid;
