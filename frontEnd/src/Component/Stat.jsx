import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Stat = ({ label, target, suffix }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500;
    const increment = Math.ceil(target / (duration / 30));
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(interval);
        setCount(target);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [inView, target]);

  const display =
    suffix === "K+" ? `${Math.floor(count / 1000)}K+` : `${count}+`;

  return (
    <div className="stat" ref={ref}>
      <div className="circle">{display}</div>
      <p>{label}</p>
    </div>
  );
};

export default Stat;
