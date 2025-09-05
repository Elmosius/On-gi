import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import useMousePosition from '../../utils/useMousePosition';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 300 : 20;

  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    gsap.to(node, {
      maskSize: `${size}px`,
      maskPosition: `${x - size / 2}px ${y - size / 2}px`,
      duration: 0.7,
      ease: 'back.out',
    });

    return () => {
      gsap.killTweensOf(node);
    };
  }, [x, y, size]);

  return (
    <section className='h-screen'>
      <div className='absolute inset-0 flex w-full h-full justify-center items-center a' ref={ref}>
        <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          Every line carriesa quiet embrace, a touch of timeless warmth, where simplicity unfolds into comfort and becomes a gentle home.
        </p>
      </div>

      <div className='flex w-full h-full justify-center items-center'>
        <p>
          On-gi (온기) is <span>the warmth hidden in simplicity</span> , where silence becomes comfort and minimalism becomes a home.
        </p>
      </div>
    </section>
  );
}
