"use client";

import { useEffect } from "react";

export function getViewPortHeight() {
  return window.visualViewport
    ? window.visualViewport.height
    : Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

const ViewportHeightSetter = () => {
  useEffect(() => {
    const preventNativeInteraction = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", preventNativeInteraction);
    document.addEventListener("selectstart", preventNativeInteraction);
    document.addEventListener("dragstart", preventNativeInteraction);

    return function cleanup() {
      document.removeEventListener("contextmenu", preventNativeInteraction);
      document.removeEventListener("selectstart", preventNativeInteraction);
      document.removeEventListener("dragstart", preventNativeInteraction);
    };
  }, []);

  useEffect(() => {
    function calcViewportHeight() {
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${getViewPortHeight()}px`,
      );
    }
    function calcViewportHeightOnScroll() {
      if (
        getComputedStyle(document.documentElement).getPropertyValue(
          "--viewport-height",
        ) === `${window.innerHeight}px`
      ) {
        return;
      }
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${window.innerHeight}px`,
      );
    }

    calcViewportHeight();
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", calcViewportHeight);
    } else {
      window.addEventListener("resize", calcViewportHeight);
      window.addEventListener("scroll", calcViewportHeightOnScroll);
    }

    return function cleanup() {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", calcViewportHeight);
      } else {
        window.removeEventListener("resize", calcViewportHeight);
        window.removeEventListener("scroll", calcViewportHeightOnScroll);
      }
    };
  });
  return null;
};

export default ViewportHeightSetter;
