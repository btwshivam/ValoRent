import React from 'react';
export { ReactComponent as CameraSVG } from "./camera.svg";
export { ReactComponent as EditSVG } from "./edit.svg";
export { ReactComponent as HidePasswordIcon } from "./hidePasswordIcon.svg";
export { ReactComponent as ServiceUnavailableSVG } from "./serviceUnavailable.svg";
export { ReactComponent as ShowPasswordIcon } from "./showPasswordIcon.svg";
export { ReactComponent as UserPlaceholder } from "./userPlaceholder.svg";

// Custom VeloRent Logo component that combines the SVG with text
export const VeloRentLogo = ({ height = "35px", showText = true }) => {
  // Import the LogoSVG component directly inside the function to avoid the eslint error
  
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {showText && (
        <span style={{ 
          marginLeft: "8px", 
          fontSize: "1.4rem", 
          fontWeight: 600, 
          color: "#2c3e50" 
        }}>
          VeloRent
        </span>
      )}
    </div>
  );
};
