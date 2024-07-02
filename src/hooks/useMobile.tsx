import { useEffect, useRef, useState } from "react";

export default function useMobile() {
  const mobileRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!mobileRef.current) {
      const isMobileFn = () => {
        try {
          document.createEvent("TouchEvent");
          return true;
        } catch (e) {
          return false;
        }
      };

      const result = isMobileFn();
      result ? setIsMobile(true) : setIsMobile(false);
    }

    return () => {
      mobileRef.current = true;
    };
  }, []);

  return {
    isMobile,
  };
}
