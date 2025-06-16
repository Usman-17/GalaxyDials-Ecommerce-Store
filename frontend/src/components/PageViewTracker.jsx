import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/ga";

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default PageViewTracker;
