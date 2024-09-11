import React from "react";
import { slide as Menu } from "react-burger-menu";
import AddNewsForm from "../../perso/NewsFormAdmin";
import "../../../assets/css/Dashboard.css";
import useDevToolsProtection from "../../../Hooks/devToolsBlocker";

const Actualites: React.FC = () => {
  useDevToolsProtection();
  return (
    <div className="dashboard">
      <Menu width={280}>
        <a id="home" className="menu-item" href="/dashboard">
          Dashboard
        </a>
        <a id="about" className="menu-item" href="/admin/dashboard/actualites">
          Actualitées
        </a>
        <a id="about" className="menu-item" href="/logout">
          Déconnexion
        </a>
      </Menu>
      <div className="container">
        <div className="h-[80vh] cus_container_res">
          {/*<h1>IMPORTANT: Il faut recentrer le form</h1>*/}
          <AddNewsForm />
        </div>
      </div>
    </div>
  );
};

export default Actualites;
