import React, { useEffect, useRef } from "react";

const SlideFade = () => {
  const ref: any = useRef();
  useEffect(() => {
    const time = ref.current.offsetWidth / 48;
    ref.current.style.animation = `fadeLeft ${time}s linear 1s infinite`;
  }, []);

  return (
    <div className="overflow-x-hidden w-full h-auto">
      <div ref={ref} className="whitespace-nowrap text-theme-text-tertiary">
        BEYOND ZERO FEE -BEYOND ZERO FEE -BEYOND ZERO FEE -BEYOND ZERO FEE
        -BEYOND ZERO FEE -BEYOND ZERO FEE -BEYOND ZERO FEE -BEYOND ZERO FEE
        -BEYOND ZERO FEE -BEYOND ZERO FEE -
      </div>
    </div>
  );
};

export default SlideFade;
