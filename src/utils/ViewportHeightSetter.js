"use client";

import { useEffect } from "react";

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

  return null;
};

export default ViewportHeightSetter;
