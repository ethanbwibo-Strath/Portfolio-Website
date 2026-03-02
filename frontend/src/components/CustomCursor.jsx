'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      const el = e.target;
      const clickable =
        el.closest('button, a, [role="button"], input, textarea, select') ||
        window.getComputedStyle(el).cursor === 'pointer';
      setHovering(!!clickable);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [visible]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.5 }}
        style={{
          width: 40,
          height: 40,
          border: '1.5px solid #FFD700',
          boxShadow: hovering ? '0 0 16px rgba(255,215,0,0.6)' : '0 0 8px rgba(255,215,0,0.3)',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-gold"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{ width: 6, height: 6, boxShadow: '0 0 6px rgba(255,215,0,0.9)' }}
      />
    </>
  );
}
