import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-53QLVC4DN3";

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
};
