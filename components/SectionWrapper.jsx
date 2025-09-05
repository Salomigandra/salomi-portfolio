"use client";

export function FullSlideWrapper({ children, className = "", bg = "transparent", center = true }) {
  return (
    <section
      className={`
        relative w-full
        min-h-screen
        px-6 md:px-12 lg:px-24
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
        min-h-[80vh] md:min-h-screen
        px-6 md:px-12 lg:px-24
        ${center ? "flex items-center justify-center" : "flex flex-col"}
        ${className}
      `}
      style={{ backgroundColor: bg }}
    >
      {children}
    </section>
  );
}
