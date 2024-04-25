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
        Kết thúc phiên giao dịch ngày 17/4, giá vàng 9999 trong nước được SJC và
        Tập Đoàn Vàng bạc đá quý DOJI niêm yết theo thứ tự mua vào và bán ra như
        sau: SJC Hà Nội: 82.100.000 đồng/lượng - 84.120.000 đồng/lượng
      </div>
    </div>
  );
};

export default SlideFade;
