import { useInView } from "../hooks/useInView";

export function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity .5s cubic-bezier(.25,.46,.45,.94) ${delay}s,
                     transform .5s cubic-bezier(.25,.46,.45,.94) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
