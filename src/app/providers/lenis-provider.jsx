"use client";

import { useRef, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis ref={lenisRef} root options={{ autoRaf: false, smooth: true, lerp: 0.1 }}>
      {children}
    </ReactLenis>
  );
}
