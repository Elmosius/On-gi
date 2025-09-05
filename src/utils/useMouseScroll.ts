import { useEffect, useState } from 'react';
import { Observer } from 'gsap/Observer';
import gsap from 'gsap';
gsap.registerPlugin(Observer);

const useMouseScroll = () => {
  const [scroll, setScroll] = useState({ y: 0 });

  useEffect(() => {
    const observer = Observer.create({
      target: document.documentElement,
      type: 'wheel,touch,pointer',
      onWheel: (e) => {
        setScroll((prev) => ({
          y: prev.y + e.deltaY,
        }));
      },
    });

    return () => {
      observer.kill();
    };
  }, []);

  return scroll;
};

export default useMouseScroll;
