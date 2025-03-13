import React, { useState, useEffect, useRef } from "react";

interface LazyGridProps {
  grid: any[][];
  Component: React.FC<any>;
  width: string;
  height: string;
  itemWidth: number;
  itemHeight: number;
}

const LazyGrid: React.FC<LazyGridProps> = ({ grid, Component, width, height, itemWidth, itemHeight }) => {
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

  const relativeWidth = grid[0].length * itemWidth;
  const relativeHeight = grid.length * itemHeight;

  const visibleRowStart = Math.floor(scrollPosition.top / itemHeight);
  const visibleRowEnd = Math.min(
    grid.length,
    Math.ceil((scrollPosition.top + parseInt(height)) / itemHeight)
  );
  const visibleColStart = Math.floor(scrollPosition.left / itemWidth);
  const visibleColEnd = Math.min(
    grid[0].length,
    Math.ceil((scrollPosition.left + parseInt(width)) / itemWidth)
  );

  return (
    <div ref={containerRef} style={{ width, height, overflow: "scroll" }}>
      <div style={{ position: "relative", width: relativeWidth, height: relativeHeight }}>
        {grid.slice(visibleRowStart, visibleRowEnd).map((row, rowIndex) =>
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
