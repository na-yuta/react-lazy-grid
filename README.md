# react-lazy-grid

`react-lazy-grid` is a React component that dynamically renders only the visible portion of a grid based on the scroll position. It is used to efficiently display large grids.

## Installation

```bash
npm install react-lazy-grid
```

or

```bash
yarn add react-lazy-grid
```

## Usage

```tsx
import React from "react";
import LazyGrid from "react-lazy-grid";

const MyComponent = (props) => {
  return <div>{props.content}</div>;
};

const App = () => {
  const grid = [
    [{ content: "Item 1" }, { content: "Item 2" }],
    [{ content: "Item 3" }, { content: "Item 4" }],
  ];

  return (
    <LazyGrid
      grid={grid}
      Component={MyComponent}
      width="500px"
      height="500px"
      itemWidth={100}
      itemHeight={100}
    />
  );
};

export default App;
```

## Props

### LazyGridProps

| Name         | Type                | Description                                                                 |
|--------------|---------------------|-----------------------------------------------------------------------------|
| `grid`       | `any[][]`           | A 2D array where each element is a property object passed to the component. |
| `Component`  | `React.FC<any>`     | The component displayed in each grid cell.                                  |
| `width`      | `string`            | The width of the entire grid.                                               |
| `height`     | `string`            | The height of the entire grid.                                              |
| `itemWidth`  | `number`            | The width of each grid cell.                                                |
| `itemHeight` | `number`            | The height of each grid cell.                                               |

## License

MIT
