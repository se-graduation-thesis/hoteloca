import React, { useState, useEffect } from "react";

function withScrollHook(Component) {
  return function WrappedComponent(props) {
    const [scrollPosition, setScrollPosition] = useState({
      scrollX: 0,
      scrollY: 0,
    });

    useEffect(() => {
      function updatePosition() {
        setScrollPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
      }

      window.addEventListener("scroll", updatePosition);
      updatePosition();

      return () => window.removeEventListener("scroll", updatePosition);
    }, []);

    return <Component {...props} scrollPosition={scrollPosition} />;
  };
}

export default withScrollHook;
