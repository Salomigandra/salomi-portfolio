"use client";

export function FullSlideWrapper({ children, className = "", bg = "transparent", center = true }) {
  return (
    <section
      className={`
        relative w-full
        min-h-[60vh] md:min-h-screen
        px-4 md:px-12 lg:px-24
        py-12 md:py-0
        ${center ? "flex items-center justify-center" : "flex flex-col"}
        ${className}
      `}
      style={{ backgroundColor: bg }}
    >
      {children}
    </section>
  );
}

export function AdaptiveWrapper({ children, className = "", bg = "transparent", center = true }) {
  return (
    <section
      className={`
        relative w-full
        min-h-[50vh] md:min-h-screen
        px-4 md:px-12 lg:px-24
        py-10 md:py-0
        ${center ? "flex items-center justify-center" : "flex flex-col"}
        ${className}
      `}
      style={{ backgroundColor: bg }}
    >
      {children}
    </section>
  );
}
