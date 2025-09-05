import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { SplitText } from 'gsap/SplitText';
import useMouseScroll from '../../utils/useMouseScroll';
import useMousePosition from '../../utils/useMousePosition';
gsap.registerPlugin(SplitText);

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const { y: scrollY } = useMouseScroll();
  const size = isHovered ? 300 : 20;

  const ref = useRef<HTMLParagraphElement>(null);
  const ref2 = useRef<HTMLParagraphElement>(null);

  const tl = gsap.timeline({ paused: true });

  useEffect(() => {
    const node = ref2.current;
    if (!node) return;

    const splitText = SplitText.create(node, { type: 'chars' });
    gsap.set(splitText.chars, { opacity: '10%' });

    tl.to(splitText.chars, {
      opacity: '100%',
      stagger: 0.05,
      ease: 'none',
    });

    const maxScroll = window.innerHeight * 4;
    const progress = Math.min(Math.floor(scrollY) / maxScroll, 1);
    tl.progress(progress);

    return () => {
      splitText.revert();
      tl.kill();
    };
  }, [scrollY]);

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
    <section className='h-screen overflow-hidden relative'>
      <p className='text-xl absolute inset-0 top-[25%] left-[15%] '>Hover to reveal the warmth, scroll to let the words appear. </p>

      <div className='absolute inset-0 flex w-full h-full justify-center items-center a z-20' ref={ref}>
        <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          Every line carriesa quiet embrace, a touch of timeless warmth, where simplicity unfolds into comfort and becomes a gentle home.
        </p>
      </div>

      <div className='flex w-full h-full justify-center items-center'>
        <p ref={ref2}>
          On-gi (온기) is <span>the warmth hidden in simplicity</span> , where silence becomes comfort and minimalism becomes a home.
        </p>
      </div>
    </section>
  );
}
