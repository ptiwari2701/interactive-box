/**
 * Calculates the C-shape layout positions for N boxes
 * @param {number} n - Number of boxes (5-25)
 * @returns {Array<{id: number, row: number, col: number}>} Array of box positions
 */
export const calculateCShapeLayout = (n) => {
  if (n < 5 || n > 25) {
    throw new Error('Number of boxes must be between 5 and 25');
  }

  const positions = [];
  let boxId = 0;
  
  let topRowWidth;
  if (n <= 7) {
    topRowWidth = 2;
  } else if (n <= 12) {
    topRowWidth = 3;
  } else if (n <= 18) {
    topRowWidth = 4;
  } else {
    topRowWidth = 5;
  }

  const topRowBoxes = Math.min(topRowWidth, Math.floor(n / 2));
  
  const remainingAfterTop = n - topRowBoxes;
  
  const bottomRowBoxes = Math.min(topRowBoxes, remainingAfterTop - 1);
  
  const middleBoxes = remainingAfterTop - bottomRowBoxes;

  for (let col = 0; col < topRowBoxes && boxId < n; col++) {
    positions.push({ id: boxId, row: 0, col });
    boxId++;
  }

  const middleStartRow = 1;
  for (let i = 0; i < middleBoxes && boxId < n; i++) {
    positions.push({ id: boxId, row: middleStartRow + i, col: 0 });
    boxId++;
  }

  const bottomRow = middleStartRow + middleBoxes;
  for (let col = 0; col < bottomRowBoxes && boxId < n; col++) {
    positions.push({ id: boxId, row: bottomRow, col });
    boxId++;
  }

  return positions;
};

/**
 * Sorts boxes by their C-shape layout position (row first, then col)
 * @param {Array} boxes - Array of box objects
 * @param {Array} layout - Layout positions from calculateCShapeLayout
 * @returns {Array} Sorted boxes array
 */
export const sortBoxesByLayout = (boxes, layout) => {
  const layoutMap = new Map(layout.map(pos => [pos.id, pos]));
  
  return [...boxes].sort((a, b) => {
    const posA = layoutMap.get(a.id);
    const posB = layoutMap.get(b.id);
    
    if (!posA || !posB) return 0;
    
    if (posA.row !== posB.row) {
      return posA.row - posB.row;
    }
    return posA.col - posB.col;
  });
};
