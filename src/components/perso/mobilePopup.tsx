import React, { useState, useEffect } from "react";

const MobilePopup: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();

    if (isMobile) {
      setShowPopup(true);
    }

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [isMobile]);

  return (
    <>
      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <h1>Attention</h1>
            <p>
              Le site web peut etre instable sur mobile. Vous pouvez quand meme
              l'utiliser, mais des bugs peuvent etre présents.
            </p>
            <button onClick={() => setShowPopup(false)}>Fermer</button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobilePopup;
