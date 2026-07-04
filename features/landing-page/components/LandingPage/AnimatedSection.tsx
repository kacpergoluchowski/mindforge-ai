"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

import type { ReactNode } from "react";

type AnimatedSectionProps = {
  // Pozwala zachować semantykę HTML przy animacji, np. karta opinii może nadal być <article>.
  as?: "article" | "div" | "section";
  children: ReactNode;
  className?: string;
  delay?: number;
};

// Wspólny wrapper animacji dla landing page.
// Trzymamy animację w jednym miejscu, żeby sekcje nie powielały konfiguracji Framer Motion.
export default function AnimatedSection({
  as = "div",
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Używamy komponentów m.* z LazyMotion, bo ładuje mniejszą część Framer Motion.
  const Component =
    as === "article" ? m.article : as === "section" ? m.section : m.div;

  return (
    <LazyMotion features={domAnimation}>
      <Component
        className={className}
        // Jeśli użytkownik ma ustawione reduced motion, animacja wejścia jest wyłączona.
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut", delay }}
        viewport={{ once: true, amount: 0.18 }}
      >
        {children}
      </Component>
    </LazyMotion>
  );
}
