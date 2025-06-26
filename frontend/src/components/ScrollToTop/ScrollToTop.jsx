import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  //? Destructure useLocation
  const { pathname } = useLocation();

  //? useLayoutEffect
  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
};

export default ScrollToTop;
