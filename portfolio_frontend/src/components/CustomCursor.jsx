import { useState, useEffect, useCallback } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('mousemove', handleMove);

    const checkHover = (e) => {
      const target = e.target;
      const over =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.tilt-card') ||
        target.closest('.cursor-pointer');
      setIsPointer(!!over);
    };

    window.addEventListener('mouseover', checkHover);

    let raf;
    const trail = () => {
      setTrailing((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(trail);
    };
    raf = requestAnimationFrame(trail);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', checkHover);
      cancelAnimationFrame(raf);
    };
  }, [isMobile, handleMove, pos]);

  if (isMobile) return null;

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: pos.x - 4,
          top: pos.y - 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#C9A96E',
          transition: 'transform 0.1s ease, opacity 0.3s ease',
          transform: isPointer ? 'scale(2.5)' : 'scale(1)',
        }}
      />
      <div
        className="custom-cursor"
        style={{
          left: trailing.x - 16,
          top: trailing.y - 16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(201, 169, 110, 0.35)',
          opacity: isPointer ? 0 : 1,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      />
    </>
  );
}
