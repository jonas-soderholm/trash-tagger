import { useEffect } from "react";
import { useSharedState } from "../../SharedContext.jsx";

function ScreenSettings() {
  const { mapArray } = useSharedState([]);
  const { isMobile, setIsMobile } = useSharedState();

  // Check if user wants to leave page or not
  useEffect(() => {
    if (mapArray.length === 0) {
      return;
    }

    const handleBeforeUnload = (e) => {
      // Cancel the event as stated by the standard.
      e.preventDefault();
      // Chrome requires returnValue to be set.
      e.returnValue = "Are you sure you want to leave? Changes you made may not be saved.";
      // Some browsers may display the message directly, while others display a fixed message.
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [mapArray]);

  // Resize if phone window update
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // Resize inner window for mobile
  useEffect(() => {
    const adjustHeight = () => {
      // Only adjust height if on mobile
      if (isMobile) {
        const mainContainer = document.querySelector(".main-container");
        if (mainContainer) {
          mainContainer.style.height = `${window.innerHeight}px`;
        }
      }
    };

    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  });
}

export default ScreenSettings;
