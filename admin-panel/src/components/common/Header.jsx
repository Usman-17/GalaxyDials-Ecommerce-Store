import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BellRing, Maximize, Minimize, ScreenShare } from "lucide-react";

const Header = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Screen Zoom
  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", fullscreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="header-top-strip d-flex align-items-center justify-content-between">
      <div className="user-details d-none d-lg-flex align-items-center mt-2">
        <h4 className="user-name">Muhammad Usman</h4>
      </div>

      <div className="d-flex align-items-center justify-content-end ms-auto gap-2 gap-lg-4">
        <div className="header-icons-links d-flex gap-2">
          {/* Shop */}
          <div className="shop">
            <Link target="_blank" rel="noopener noreferrer">
              <ScreenShare size={18} />
            </Link>
          </div>

          {/* Full Screen */}
          <div
            className="full-screen d-none d-md-flex"
            onClick={toggleFullScreen}
          >
            {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </div>

          {/* Notifications */}
          <div className="notifications">
            <BellRing size={18} />
          </div>
        </div>

        {/* Profile Img */}
        <Link
          to={"/account"}
          className="avatar d-flex align-items-center gap-1"
        >
          <img src={"/avatar-placeholder.png"} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
