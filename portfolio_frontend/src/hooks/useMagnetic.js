import { useState, useCallback } from 'react';

export default function useMagnetic({ strength = 0.3, speed = 300 } = {}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setOffset({ x: x * strength, y: y * strength });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: `transform ${speed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  };

  return { style, handleMouseMove, handleMouseLeave };
}
