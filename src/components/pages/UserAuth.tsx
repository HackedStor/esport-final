// src/components/UserAuth.tsx
import React from "react";
import FormAuth from "../perso/FormAuth";
import "../../assets/css/UserAuth.css";
import useDevToolsProtection from "../../Hooks/devToolsBlocker";

const UserAuth: React.FC = () => {
  useDevToolsProtection();
  return (
    <div className="UserAuth">
      <FormAuth />
    </div>
  );
};

export default UserAuth;
