import React from "react";
import { Link } from "react-router-dom";

import AddNewsForm from "../../perso/NewsFormAdmin";
import "../../../assets/css/Dashboard.css";

const Actualites: React.FC = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <nav>
          <ul className="mt-6">
            <li>
              <Link to="/dashboard">Tableau de bord</Link>
            </li>
            <li>
              <Link to="/admin/dashboard/actualites">Actualitées</Link>
            </li>
            <li>
              <Link to="/dashboard/settings">Paramètres</Link>
            </li>
            <li>
              <Link to="/logout">Déconnexion</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="actu-title">
        <h1 className="text-4xl my-5">Actualités</h1>
      </div>
      <div className="flex justify-between items-center w-screen h-screen px-40">
        <AddNewsForm></AddNewsForm>
      </div>
    </div>
  );
};

export default Actualites;
