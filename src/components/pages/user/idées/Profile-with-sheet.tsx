/* eslint-disable @typescript-eslint/no-explicit-any */
import { slide as Menu } from "react-burger-menu";
import "../../../assets/css/Dashboard.css";
import CustomSheet from "../../perso/sheet";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Menu width={280}>
        <a id="home" className="menu-item" href="/dashboard">
          Tableau de bord
        </a>
        <a id="about" className="menu-item" href="/dashboard/profile">
          Profil
        </a>
        <a id="about" className="menu-item" href="/logout">
          Déconnexion
        </a>
      </Menu>
      <main className="dashboard-content profile-btn">
        <CustomSheet label="League of legends" />
        <CustomSheet label="Valorant" />
        <CustomSheet label="Trackmania" />
        <CustomSheet label="Fc24" />
        <CustomSheet label="Super Smash Bros" />
        <CustomSheet label="Mario Kart" />
      </main>
    </div>
  );
};

export default Dashboard;
