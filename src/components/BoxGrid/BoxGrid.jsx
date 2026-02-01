import React, { useMemo } from 'react';
import Box from '../Box/Box';
import { calculateCShapeLayout } from '../../utils/cShapeLayout';
import './BoxGrid.css';

const BoxGrid = ({ boxes, onBoxClick, isDisabled }) => {
  const layout = useMemo(() => {
    if (boxes.length > 0) {
      try {
        return calculateCShapeLayout(boxes.length);
      } catch (err) {
        return [];
      }
    }
    return [];
  }, [boxes.length]);

  const positionMap = useMemo(() => {
    const map = new Map();
    layout.forEach((pos) => {
      map.set(pos.id, { row: pos.row, col: pos.col });
    });
    return map;
  }, [layout]);

  const gridDimensions = useMemo(() => {
    if (layout.length === 0) return { rows: 0, cols: 0 };

    const maxRow = Math.max(...layout.map((p) => p.row));
    const maxCol = Math.max(...layout.map((p) => p.col));

    return {
      rows: maxRow + 1,
      cols: maxCol + 1,
    };
  }, [layout]);

  const sortedBoxes = useMemo(() => {
    if (layout.length === 0) return boxes;

    const layoutMap = new Map(layout.map((pos) => [pos.id, pos]));

    return [...boxes].sort((a, b) => {
      const posA = layoutMap.get(a.id);
      const posB = layoutMap.get(b.id);

      if (!posA || !posB) return 0;

      if (posA.row !== posB.row) {
        return posA.row - posB.row;
      }
      return posA.col - posB.col;
    });
  }, [boxes, layout]);

  if (boxes.length === 0) {
    return null;
  }

  return (
    <div className="box-grid-container">
      <div
        className="box-grid"
        style={{
          gridTemplateRows: `repeat(${gridDimensions.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${gridDimensions.cols}, 50px)`,
        }}
      >
        {sortedBoxes.map((box) => {
          const position = positionMap.get(box.id);
          if (!position) return null;

          return (
            <div
              key={box.id}
              className="box-wrapper"
              style={{
                gridRow: position.row + 1,
                gridColumn: position.col + 1,
              }}
            >
              <Box
                id={box.id}
                color={box.color}
                onClick={() => onBoxClick(box.id)}
                isDisabled={isDisabled}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoxGrid;
