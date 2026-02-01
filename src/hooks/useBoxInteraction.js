import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to manage box interactions and state
 * @param {number} boxCount - Number of boxes to create
 * @returns {Object} Box state and interaction handlers
 */
export const useBoxInteraction = (boxCount) => {
  const [boxes, setBoxes] = useState([]);
  const [clickOrder, setClickOrder] = useState([]);
  const [isReverting, setIsReverting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const timeoutRefs = useRef([]);

  useEffect(() => {
    if (boxCount >= 5 && boxCount <= 25) {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current = [];

      const newBoxes = Array.from({ length: boxCount }, (_, index) => ({
        id: index,
        color: 'red',
      }));
      setBoxes(newBoxes);
      setClickOrder([]);
      setIsReverting(false);
      setIsDisabled(false);
    }
  }, [boxCount]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  const startRevertAnimation = useCallback((currentBoxes, order) => {
    const reverseOrder = [...order].reverse();

    reverseOrder.forEach((boxId, index) => {
      const timeout = setTimeout(() => {
        setBoxes((prevBoxes) =>
          prevBoxes.map((b) =>
            b.id === boxId ? { ...b, color: 'red' } : b
          )
        );

        if (index === reverseOrder.length - 1) {
          const resetTimeout = setTimeout(() => {
            setIsReverting(false);
            setIsDisabled(false);
            setClickOrder([]);
          }, 100);
          timeoutRefs.current.push(resetTimeout);
        }
      }, (index + 1) * 1000);

      timeoutRefs.current.push(timeout);
    });
  }, []);

  const handleBoxClick = useCallback(
    (boxId) => {
      if (isDisabled || isReverting) return;

      setBoxes((prevBoxes) => {
        const box = prevBoxes.find((b) => b.id === boxId);
        if (!box || box.color === 'green') return prevBoxes;

        const updatedBoxes = prevBoxes.map((b) =>
          b.id === boxId ? { ...b, color: 'green' } : b
        );

        const allGreen = updatedBoxes.every((b) => b.color === 'green');
        if (allGreen) {
          setIsReverting(true);
          setIsDisabled(true);
          setClickOrder((currentOrder) => {
            const finalOrder = [...currentOrder, boxId];
            startRevertAnimation(updatedBoxes, finalOrder);
            return finalOrder;
          });
        }

        return updatedBoxes;
      });

      setClickOrder((prevOrder) => [...prevOrder, boxId]);
    },
    [isDisabled, isReverting, startRevertAnimation]
  );

  return {
    boxes,
    clickOrder,
    isReverting,
    isDisabled,
    handleBoxClick,
  };
};
